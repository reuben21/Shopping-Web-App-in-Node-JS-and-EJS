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
                path: '/products',
                isAuthenticated:req.session.isLoggedIn

              });
        }
    ).catch(err => {
        console.log(err);
    });

}

exports.getSingleProduct = (req, res, next) => {
   const product_id = req.params.productId;

   console.log(product_id,req.session.isLoggedIn)
    Product.findById(product_id).then(product => {
        res.render('shop/product-detail', {
            prods: product,
            pageTitle: 'Shop',
            path: '/product-detail',
            isAuthenticated:req.session.isLoggedIn
            });
    })



}
exports.getIndex = (req, res, next)=>{
    Product.find().then(
        products => {
           res.render('shop/product-list', {
               prods: products,
               pageTitle: 'Shop',
               path: '/products',
               isAuthenticated:req.session.isLoggedIn

             });
       }
   ).catch(err => {
       console.log(err);
   });
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.product_id')
        .execPopulate()
        .then(user => {
            // console.log(user.cart.items);
            const products = user.cart.items;
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: products,
                isAuthenticated:req.session.isLoggedIn
                // totalPrice:cart.totalPrice
            });
        }).catch(err => console.log(err));
}



exports.postCart = (req,res,next)=>{
    const product_id = req.body.product_id;
    Product.findById(product_id).then((product)=>{
        return req.session.user.addToCart(product);
        // Cart.addProduct(product_id,product.price)
    }).then(result=>{
            // console.log(result);
    }

        )
    res.redirect('/');
}

exports.getDeleteItemFromCart = (req, res, next) => {
    const product_id = req.params.productId;
    req.user.deleteItemFromCart(product_id).then(result=>{
        res.redirect('/cart');
    }).catch(err => console.log(err));


}
exports.postOrders = (req, res, next) => {
    req.session.user
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
    }).catch(err => console.log(err));
}
exports.getOrders = (req, res, next) => {
    Order.find({ 'user.user_id':req.user._id }).then(orders=>{
        res.render('shop/orders', {
            path:'/orders',
            pageTitle: 'Orders',
            orders:orders,
            isAuthenticated:req.session.isLoggedIn
        });
    });


}
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
        isAuthenticated:req.session.isLoggedIn
      });
}
