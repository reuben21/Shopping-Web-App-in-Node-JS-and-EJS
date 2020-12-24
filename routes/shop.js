const express = require('express');
const router = express.Router();
const path = require('path');

const shopController = require('../controllers/shop')

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId',shopController.getSingleProduct);

router.post('/cart',shopController.postCart);

router.get('/cart',shopController.getCart);

router.get('/cart-delete-item/:productId',shopController.getDeleteItemFromCart)

router.get('/checkout',shopController.getCheckout);

router.get('/orders',shopController.getOrders);

module.exports = router;
