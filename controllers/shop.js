const Product = require('../models/product');
const Order = require('../models/Order');

// exports.getProducts = (req, res, next) => {
//     const products = Product.fetchAll();
//     res.render('shop', {
//         prods: products,
//         pageTitle: 'Shop',
//         path: '/',

//       });
// }

exports.getProducts = (req, res, next) => {
    Product.find().then(
        products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/products'


            });
        }
    ).catch(err => {
        const error = new Error(err);
        err.httpStatusCode = 500;
        return next(error);
    });

}

exports.getSingleProduct = (req, res, next) => {
    const product_id = req.params.productId;

    Product.findById(product_id).then(product => {
        res.render('shop/product-detail', {
            prods: product,
            pageTitle: 'Shop',
            path: '/product-detail',


        });
    })


}
exports.getIndex = (req, res, next) => {
    Product.find().then(
        products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/products'

            });
        }
    ).catch(err => {
        const error = new Error(err);
        err.httpStatusCode = 500;
        return next(error);
    });
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.product_id')
        .execPopulate()
        .then(user => {

            const products = user.cart.items;
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: products
                // totalPrice:cart.totalPrice
            });
        }).catch(err => {
            const error = new Error(err);
            err.httpStatusCode = 500;
            return next(error);
        }
    );
}


exports.postCart = (req, res, next) => {
    const product_id = req.body.product_id;
    Product.findById(product_id).then((product) => {
        return req.user.addToCart(product);
        // Cart.addProduct(product_id,product.price)
    }).then(result => {
            // console.log(result);
        }
    )
    res.redirect('/');
}

exports.getDeleteItemFromCart = (req, res, next) => {
    const product_id = req.params.productId;
    req.user.deleteItemFromCart(product_id).then(result => {
        res.redirect('/cart');
    }).catch(err => {
        const error = new Error(err);
        err.httpStatusCode = 500;
        return next(error);
    });


}
exports.postOrders = (req, res, next) => {
    req.user
        .populate('cart.items.product_id')
        .execPopulate()
        .then(user => {
            // console.log(user.cart.items);
            const products = user.cart.items.map(i => {
                return {quantity: i.quantity, product: {...i.product_id._doc}}
            });
            const order = new Order({
                user: {
                    name: req.session.user.name,
                    user_id: req.session.user
                },
                products: products
            })
            return order.save();

        }).then(result => {
        req.user.clearCart();
        res.redirect('/orders');
    }).catch(err => {

        const error = new Error(err);
        err.httpStatusCode = 500;
        return next(error);
    });
}
exports.getOrders = (req, res, next) => {
    Order.find({'user.user_id': req.user._id}).then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Orders',
            orders: orders,
            isAuthenticated: req.session.isLoggedIn,
            csrfToken: req.csrfToken()
        });
    });


}
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
    });
}
