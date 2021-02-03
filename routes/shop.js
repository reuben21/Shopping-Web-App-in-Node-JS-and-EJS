const express = require('express');
const router = express.Router();
// const path = require('path');
const isAuth = require('../middleware/is-auth');
const shopController = require('../controllers/shop')

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId',shopController.getSingleProduct);

router.post('/cart',isAuth,shopController.postCart);

router.get('/cart',isAuth,shopController.getCart);

router.get('/cart-delete-item/:productId',isAuth,shopController.getDeleteItemFromCart)

router.get('/checkout',isAuth,shopController.getCheckout);

router.get('/orders',isAuth,shopController.getOrders);

router.get('/postorders',isAuth,shopController.postOrders);
// 6016ea7da6c9183698c81f5e
router.get('/orders/invoices/:orderId',isAuth,shopController.getInvoice);

module.exports = router;
