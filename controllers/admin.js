const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log("Another  Middleware")
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing:false
    })
};

exports.postAddProduct = (req, res, next) => {

    const product = new Product(req.body.product_name
        ,parseFloat(req.body.product_price)
        ,req.body.product_image_url
        ,req.body.product_description)
    product.save();
    // products.push({
    //     title: req.body.product_name,
    //     price: req.body.product_price
    // })
    console.log(product)
    res.redirect(`/`);
}

exports.getEditProduct = (req, res, next) => {
    const editMode = Boolean(req.query.edit);
    console.log(editMode)
    if(!editMode){
        res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findById(prodId,product=>{
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product', 
            editing:editMode,
            product:product,
    
        })

    })
    
};

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