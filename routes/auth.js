const express = require('express');
const router = express.Router();
const { check,body } = require('express-validator/check');
const authController = require('../controllers/auth')
const User = require('../models/user');
router.get('/login',authController.getLogin);

router.get('/register',authController.getRegister);

router.post('/register', [

        // Adding A Custom Validation is also possible
        // .custom(()=>{
        //
        // }),,
        check('user_name')
            .isAlphanumeric()
            .withMessage('Enter A Proper Username').trim(),
        check('user_email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Enter A Proper Email-ID')
            .custom((value, {req}) => {
                return User
                    .findOne({email: value})
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject("Email-Id is already Taken")
                        }
                    })
            }),
        check('user_password')
            .trim()
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
            .withMessage('A password should be alphanumeric.' +
                'First letter of the password should be capital.\n' +
                'Password must contain a special character (@, $, !, &, etc).\n' +
                'Password length must be greater than 8 characters.\n')
            ,
        body('confirm_password').trim().custom((value, {req}) => {
            if (value !== req.body.user_password) {

                throw new Error('Passwords Do Not Match')
            }
            return true;

        })

    ]
    , authController.postRegister);

router.post('/login',authController.postLogin);

router.post('/logout',authController.postLogout);

router.get('/reset',authController.getReset);

router.post('/reset',authController.postReset);

router.get('/reset/:token',authController.getNewPassword);

router.post('/newpassword',authController.postNewPassword);

module.exports = router;
