const express = require('express');
const router = express.Router();
const path = require('path');

const adminController = require('../controllers/admin')




router.get('/add-product',adminController.getAddProduct);

router.get('/products',adminController.getAllProducts);

router.post('/add-product',adminController.postAddProduct);


router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct);

router.get('/delete-product/:productId',adminController.getDeleteProduct);



module.exports = router;
