"use strict";

var express = require('express');

var router = express.Router();

var path = require('path');

var adminData = require('./admin');

router.get('/', function (req, res, next) {
  var products = adminData.products;
  res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});
module.exports = router;