const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator/check')
const crypto = require('crypto');
const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "",
        pass:""
    }
});

exports.getLogin = (req, res, next) => {

    // console.log(req.get('Cookie'));
    res.render('auth/auth', {
        path: '/login',
        pageTitle: 'Login',
        register: false,
        registerComplete: false,
        invalidCredentials: false,
        errorMessage: false,

    });

}

exports.getRegister = (req, res, next) => {

    res.render('auth/auth', {
        path: '/register',
        pageTitle: 'Register',
        register: true,
        registerComplete: false,
        invalidCredentials:false,
        errorMessage:false,
    });

}
exports.postRegister = (req, res, next) => {
    // console.log(req.user);
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const user_password = req.body.user_password;
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()){
        console.log(errors.array())
        return res.status(422).render('auth/auth', {
            path: '/register',
            pageTitle: 'Register',
            register: true,
            registerComplete: false,
            invalidCredentials:true,
            errorMessage:errors.array(),
        });
    }
    // const hashed_password =


        User
            .findOne({email: user_email})
            .then(userDoc => {
                if (userDoc) {
                    return res.render('auth/auth', {
                        path: '/register',
                        pageTitle: 'Register',
                        register: false,
                        registerComplete: false,
                        isAuthenticated: false,
                        invalidCredentials:true,
                        errorMessage:"Email-Id is already Taken"


                    });
                }
                return bcrypt.hash(user_password, 16).then(hashed_password => {
                    const user = new User({
                        name: user_name,
                        email: user_email,
                        password: hashed_password,
                        cart: {items: []},

                    })
                    return user.save()
                }).then(result => {
                   return res.render('auth/auth', {
                        path: '/login',
                        pageTitle: 'Login',
                        register: false,
                        registerComplete: true,
                        isAuthenticated: false,
                        invalidCredentials: false,
                        errorMessage: false,


                    });
                   // For Sending An Email


                })
            })
            .catch(err=>{
                console.log(err)
            });


}

exports.postLogin = (req, res, next) => {

    const user_email = req.body.user_email;
    const user_password = req.body.user_password;

    User
        .findOne({email: user_email})
        .then(user => {
            if (!user) {
                return res.render('auth/auth', {
                    path: '/login',
                    pageTitle: 'Login',
                    register: false,
                    registerComplete: false,
                    isAuthenticated: false,
                    invalidCredentials:true,
                    errorMessage:false,


                });
            }
            bcrypt.compare(user_password, user.password)
                .then(doMatch => {

                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                                console.log(err);
                                res.redirect('/');
                            }
                        )

                    }
                    return res.render('auth/auth', {
                        path: '/login',
                        pageTitle: 'Login',
                        register: false,
                        registerComplete: false,
                        isAuthenticated: false,
                        invalidCredentials: true,
                        errorMessage: false,


                    });

                }).catch(err => {
                console.log(err)

            });


        })


}

exports.postLogout = (req, res, next) => {

    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/');
    })


}

exports.getReset = (req, res, next) => {


    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        register: false,
        invalidCredentials: false,
        errorMessage: false,


    });


}

exports.postReset = (req, res, next) => {
    console.log(req.body.email)
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
            return res.redirect('/');
        }
        const token = buffer.toString('hex');
        User.findOne({email: req.body.email})
            .then(user => {
                if (!user) {
                    console.log("Entered", user)
                    return null;

                } else {
                    user.resetToken = token;
                    user.resetTokenExpiration = Date.now() + 3600000;
                    return user.save();
                }

            }).then(result => {
            if (result === null) {
                console.log("Entered result", result)
                res.render('auth/reset', {
                    path: '/reset',
                    pageTitle: 'Reset Password',
                    register: false,
                    invalidCredentials: true,
                    errorMessage: false,

                })
            }
            mailTransporter.sendMail({
                to: req.body.email,
                from: "hectorjonasy@gmail.com",
                subject: 'Password Reset Email',
                text: 'Requested For Password Reset',
                html: `<h4>Click this link to Get started <a href="http://localhost:3000/reset/${token}">Over Here</a> </h4>`
            }).then(() => {
                console.log('Email sent')
                return res.render('auth/reset', {
                    path: '/reset',
                    pageTitle: 'Reset Password',
                    register: false,
                    invalidCredentials: true,
                    errorMessage: "Email Was Sent",

                })
            })
                .catch((error) => {
                    console.error(error)
                })


        })
            .catch(err => {
                console.log(err);
            })
    })


}


exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
        .then(user => {
            console.log("The User: ",user)
            res.render('auth/newpassword', {
                path: '/newpassword',
                pageTitle: 'New Password',
                register: false,
                invalidCredentials: false,
                errorMessage: false,
                user_id: user._id.toString(),
                password_token: token
            });

        });

}

exports.postNewPassword = (req, res, next) => {
    const password = req.body.password;
    const user_id = req.body.user_id;
    const password_token = req.body.password_token;
    let resetUser;
    User.findOne({
        resetToken: password_token,
        _id: user_id,
        resetTokenExpiration:
            {
                $gt: Date.now()

            }
    })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(password, 16)


        }).then(hashed_password => {
        resetUser.password = hashed_password;
        resetUser.resetToken = null;
        resetUser.resetTokenExpiration = undefined;
        console.log("User Reset: ",resetUser)
        return resetUser.save();
    }).then(result => {
        return res.redirect('/login')
    }).catch(err => {
        console.log(err);
    });

}
