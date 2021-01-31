const {check} = require('express-validator/check');

const express = require('express');
const router = express.Router();
// const path = require('path');
const isAuth = require('../middleware/is-auth');
const adminController = require('../controllers/admin')


router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products',isAuth,adminController.getAllProducts);

router.post('/add-product', [
        check('product_name')
            .isLength({min:5})
            .withMessage('Enter A Correct Product Name'),
        check('product_price')
            .isFloat().trim()
            .withMessage('Enter Correct Price'),
        // check('product_image_url')
        //     .isURL().trim()
        //     .withMessage('Enter A Correct Image URL'),
        check('product_description')
            .isLength({min:10})
            .withMessage('Enter A Correct Description'),

    ],
    isAuth,
    adminController.postAddProduct);


router.get('/edit-product/:productId', isAuth,adminController.getEditProduct);

router.post('/edit-product',[
    check('product_name')
        .isLength({min:5})
        .withMessage('Enter A Correct Product Name'),
    check('product_price')
        .isFloat().trim()
        .withMessage('Enter Correct Price'),
    check('product_image_url')
        .isURL().trim()
        .withMessage('Enter A Correct Image URL'),
    check('product_description')
        .isLength({min:10})
        .withMessage('Enter A Correct Description'),

],isAuth,adminController.postEditProduct);

router.get('/delete-product/:productId',isAuth,adminController.getDeleteProduct);


module.exports = router;
