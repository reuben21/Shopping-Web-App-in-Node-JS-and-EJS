"use strict";

var express = require('express');

var router = express.Router();

var path = require('path');

var productsController = require('../controllers/products');

router.get('/add-product', productsController.getAddProduct);
router.post('/product', productsController.postAddProduct);
module.exports = router;