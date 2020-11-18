"use strict";

var express = require('express');

var router = express.Router();

var path = require('path');

var products = [];
router.get('/add-product', function (req, res, next) {
  console.log("Another  Middleware");
  res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});
router.post('/product', function (req, res, next) {
  products.push({
    title: req.body.product_name,
    price: req.body.product_price
  });
  console.log(products);
  res.redirect("/");
});
exports.routes = router;
exports.products = products;