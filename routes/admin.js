const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/add-product', (req, res, next) => {
    console.log("Another  Middleware")
    res.sendFile(path.join(__dirname,'../','views','add-product.html'));

});

router.post('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect(`/`);
});


module.exports = router;