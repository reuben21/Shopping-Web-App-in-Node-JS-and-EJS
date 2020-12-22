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
                path: '/',

              });
        }
    );

}

exports.getIndex = (req,res,next) =>{

}
