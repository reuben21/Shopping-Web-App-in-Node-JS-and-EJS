const Product = require('../models/product');
const {validationResult} = require('express-validator/check');

exports.getAddProduct = (req, res, next) => {
    // console.log("Another  Middleware")
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }

    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing:false,
        invalidCredentials:false,
        errorMessage:false,
    })
};

exports.postAddProduct = (req, res, next) => {
    // console.log(req.user);
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }

    console.log("Entered POST ADD PRODUCT")
    const product_name = req.body.product_name;
    const product_price = parseFloat(req.body.product_price);
    // const product_image_url = req.body.product_image_url;
    const product_image_picker = req.file;
    const product_image_picker_base64 = req.body.product_image_picker_base64;
    const product_description = req.body.product_description;
        // ,req.user._id
    console.log("Image ",product_image_picker_base64)
    if(!product_image_picker){
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing:false,
            invalidCredentials:true,
            errorMessage:"Attached File is an Incorrect Format",
        });
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        // console.log(errors.array())
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing:false,
            invalidCredentials:true,
            errorMessage:errors.array()[0].msg,
        });
    }
    const product_image_url = product_image_picker.path
    const product = new Product({
        title:product_name,
        price:product_price,
        image_url:product_image_picker_base64,
        description:product_description,
        user_id:req.user
    })

    product.save().then(result=>{

        res.redirect(`/`);
    })
    .catch(err=>{
        console.log("Entered POST ADD PRODUCT ERROR")
        const error = new Error(err);
        err.httpStatusCode = 500;
        return next(error);
        // return res.status(500).render('404', {
        //     pageTitle: 'Page Not Found',
        //     path:"/404",
        //     text_message:"505 Page Error"
        // });
    });
    // products.push({
    //     title: req.body.product_name,
    //     price: req.body.product_price
    // })
    // console.log(product)

}

exports.getDeleteProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    const deleteMode = Boolean(req.query.delete);
    const product_id = req.params.productId;

    if(deleteMode) {
        Product.deleteOne({_id:product_id,user_id:req.user._id}).then(() =>{
            res.redirect(`/admin/products`);
        });

    } else {
        res.redirect(`/admin/products`);
    }

}
exports.getEditProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
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
            invalidCredentials:false,
            errorMessage:false,

        })

    }).catch(err=>{
        const error = new Error(err);
        err.httpStatusCode = 500;
        return next(error);
    });

};

exports.postEditProduct = (req, res, next) =>{
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    const product_id = req.body.product_id;
    const product_name = req.body.product_name;
    const product_price = parseFloat(req.body.product_price);
    const product_image_url = req.body.product_image_url;
    const product_description = req.body.product_description;
    const errors = validationResult(req);


    Product.findById(product_id).then(product=>{
        if (!errors.isEmpty()){
            console.log(errors.array())
            return res.status(422).render('admin/edit-product', {
                pageTitle: 'Add Product',
                path: '/admin/add-product',
                editing:true,
                product:product,
                invalidCredentials:true,
                errorMessage:errors.array()[0].msg,
            });
        }
        if(product.user_id.toString() !== req.user._id.toString() ){
            return res.redirect('/')
        }
        product.title = product_name
        product.price = product_price
        product.image_url = product_image_url
        product.description = product_description
        product.save();
    }).then(result=>{
            // console.log("updatedProduct product")
            res.redirect(`/admin/products`);
        })
        .catch(err=>{
            const error = new Error(err);
            err.httpStatusCode = 500;
            return next(error);
        });

};

exports.getAllProducts = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }

    // console.log("OUTSIDE FINB BY USER",req.session,"\n",req.session.isLoggedIn)
    Product.find({user_id:req.user._id})
        // .select('title price _id image_url')
        // .populate('user_id','name')
        .then(
        products => {
            // console.log(products)
           res.render('admin/products', {
               prods: products,
               pageTitle: 'Shop',
               path: '/products',


             });
       }
   ).catch(err => {
        const error = new Error(err);
        err.httpStatusCode = 500;
        return next(error);
   });

}
