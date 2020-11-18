const express = require('express');
const router = express.Router();
const path = require('path');


const products = [];


router.get('/add-product', (req, res, next) => {
    console.log("Another  Middleware")
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });

});

router.post('/product', (req, res, next) => {
    products.push({
        title: req.body.product_name,
        price: req.body.product_price
    })
    console.log(products)
    res.redirect(`/`);
});


exports.routes = router;
exports.products = products;