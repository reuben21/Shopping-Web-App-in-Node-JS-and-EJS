const express = require('express');
const router = express.Router();
// const path = require('path');
const isAuth = require('../middleware/is-auth');
const adminController = require('../controllers/admin')




router.get('/add-product',isAuth,adminController.getAddProduct);

router.get('/products',isAuth,adminController.getAllProducts);

router.post('/add-product',isAuth,adminController.postAddProduct);


router.get('/edit-product/:productId', isAuth,adminController.getEditProduct);

router.post('/edit-product',isAuth,adminController.postEditProduct);

router.get('/delete-product/:productId',isAuth,adminController.getDeleteProduct);



module.exports = router;
