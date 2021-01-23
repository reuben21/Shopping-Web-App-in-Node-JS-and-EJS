const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/login',authController.getLogin);

router.get('/register',authController.getRegister);

router.post('/register',authController.postRegister);

router.post('/login',authController.postLogin);

router.post('/logout',authController.postLogout);

router.get('/reset',authController.getReset);

router.post('/reset',authController.postReset);

module.exports = router;
