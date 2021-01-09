const Product = require('../models/product');
const mongodb = require('mongodb');
exports.getAddProduct = (req, res, next) => {
    // console.log("Another  Middleware")
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing:false
    })
};

exports.postAddProduct = (req, res, next) => {
    // console.log(req.user);
    const product_name = req.body.product_name;
    const product_price = parseFloat(req.body.product_price);
    const product_image_url = req.body.product_image_url;
    const product_description = req.body.product_description;
        // ,req.user._id
    const product = new Product({
        title:product_name,
        price:product_price,
        image_url:product_image_url,
        description:product_description
    })

    product.save().then(result=>{
        console.log("Created product")
        res.redirect(`/admin/products`);
    })
    .catch(err=>{
        console.log(err)
    });
    // products.push({
    //     title: req.body.product_name,
    //     price: req.body.product_price
    // })
    // console.log(product)

}

exports.getDeleteProduct = (req, res, next) => {
    const deleteMode = Boolean(req.query.delete);
    const product_id = req.params.productId;

    if(deleteMode) {
        Product.findByIdAndRemove(product_id).then(() =>{
            res.redirect(`/admin/products`);
        });

    } else {
        res.redirect(`/admin/products`);
    }

}
exports.getEditProduct = (req, res, next) => {
    const editMode = Boolean(req.query.edit);
    if(!editMode){
        res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findById(prodId).then(product=>{
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing:editMode,
            product:product,

        })

    }).catch(err=>{
        console.log(err)
    });

};

exports.postEditProduct = (req, res, next) =>{
    const product_id = req.body.product_id;
    const product_name = req.body.product_name;
    const product_price = parseFloat(req.body.product_price);
    const product_image_url = req.body.product_image_url;
    const product_description = req.body.product_description;
    Product.findById(product_id).then(product=>{
        product.title = product_name
        product.price = product_price
        product.image_url = product_image_url
        product.description = product_description
        product.save();
    }).then(result=>{
            console.log("updatedProduct product")
            res.redirect(`/admin/products`);
        })
        .catch(err=>{
            res.redirect('/admin/products');
        });

};

exports.getAllProducts = (req, res, next) => {
    Product.find().then(
        products => {
           res.render('admin/products', {
               prods: products,
               pageTitle: 'Shop',
               path: '/products',

             });
       }
   ).catch(err => {
       console.log(err);
   });

}
