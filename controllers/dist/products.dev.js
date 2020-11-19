"use strict";

var products = [];

exports.getAddProduct = function (req, res, next) {
  console.log("Another  Middleware");
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

exports.postAddProduct = function (req, res, next) {
  products.push({
    title: req.body.product_name,
    price: req.body.product_price
  });
  console.log(products);
  res.redirect("/");
};

exports.getProducts = function (req, res, next) {
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
};