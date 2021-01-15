const User = require('../models/user');
const bcrypt = require('bcryptjs');


const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


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

    const hashed_password =


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
                    res.render('auth/auth', {
                        path: '/login',
                        pageTitle: 'Login',
                        register: false,
                        registerComplete: true,
                        isAuthenticated: false,
                        invalidCredentials: false,
                        errorMessage: false,


                    });
                    return sgMail.send({
                        to: user_email,
                        from: "hectorjonasy@gmail.com",
                        subject: 'Sign Up Successfully',
                        text: 'and easy to do anywhere, even with Node.js',
                        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                    }).then(() => {
                        console.log('Email sent')
                    })
                        .catch((error) => {
                            console.error(error)
                        })

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
                    return   res.render('auth/auth', {
                        path: '/login',
                        pageTitle: 'Login',
                        register: false,
                        registerComplete: false,
                        isAuthenticated: false,
                        invalidCredentials:true,
                        errorMessage:false,


                    });

                }).catch(err => {
                console.log(err)
                return res.redirect("/login")
            });


        })


}

exports.postLogout = (req, res, next) => {

    req.session.destroy((err)=>{
        console.log(err)
        res.redirect('/');
    })



}
