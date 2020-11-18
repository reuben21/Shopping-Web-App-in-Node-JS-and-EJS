"use strict";

var express = require('express');

var router = express.Router();

var path = require('path');

var adminData = require('./admin');

router.get('/', function (req, res, next) {
  var products = adminData.products;
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
});
module.exports = router;