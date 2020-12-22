const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log("Another  Middleware")
    res.render('admin/add-product', {
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

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(
        products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Shop',
                path: '/products',

              });
        }
    );

}