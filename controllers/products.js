const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
        console.log("Another  Middleware")
        res.render('add-product', {
                pageTitle: 'Add Product',
                path: '/admin/add-product'
            })
    };

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.product_name,req.body.product_price)
    product.save();
    // products.push({
    //     title: req.body.product_name,
    //     price: req.body.product_price
    // })
    console.log(product)
    res.redirect(`/`);
}

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
            res.render('shop', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
        
              });
        }
    );
    
}
