const express = require('express');
const router = express.Router();
const path = require('path');

const adminData = require('./admin');
router.get('/',(req, res, next) => {
    const products = adminData.products;
    res.sendFile(path.join(__dirname,'../','views','shop.html'));
});



module.exports = router;