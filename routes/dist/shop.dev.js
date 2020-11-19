"use strict";

var express = require('express');

var router = express.Router();

var path = require('path');

var productsController = require('../controllers/products');

router.get('/', productsController.getProducts);
module.exports = router;