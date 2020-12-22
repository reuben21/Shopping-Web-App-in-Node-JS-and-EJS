const express = require('express');
const router = express.Router();
const path = require('path');

const adminController = require('../controllers/admin')




router.get('/add-product',adminController.getAddProduct);

router.get('/products');

router.post('/product', adminController.postAddProduct);


module.exports = router;
