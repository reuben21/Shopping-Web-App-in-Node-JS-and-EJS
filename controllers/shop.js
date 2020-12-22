const Product = require('../models/product');


// exports.getProducts = (req, res, next) => {
//     const products = Product.fetchAll();
//     res.render('shop', {
//         prods: products,
//         pageTitle: 'Shop',
//         path: '/',

//       });
// }

exports.getProducts = (req, res, next) => {
    Product.fetchAll(
        products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/products',

              });
        }
    );

}
exports.getSingleProduct = (req, res, next) => {
   const product_id = req.params.productId;
   console.log(product_id);
    Product.findById(product_id, product => {
        console.log(product)
    })
res.render('shop/product-detail', {
    prods: product_id,
    pageTitle: 'Shop',
    path: '/product-detail',

    });
      

}
exports.getIndex = (req, res, next)=>{
    Product.fetchAll(
        products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'All Products',
                path: '/',

              });
        }
    );
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
      });
}
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
      });
}
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
      });
}