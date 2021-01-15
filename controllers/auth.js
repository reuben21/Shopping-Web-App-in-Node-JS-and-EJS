const User = require('../models/user');
const bcrypt = require('bcryptjs');
exports.getLogin = (req, res, next) => {

    // console.log(req.get('Cookie'));
        res.render('auth/auth', {
            path: '/login',
            pageTitle: 'Login',
            register: false,
            registerComplete: false,

        });

}

exports.getRegister = (req, res, next) => {

    res.render('auth/auth', {
        path: '/register',
        pageTitle: 'Register',
        register: true,
        registerComplete: false,


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
                    return res.redirect("/register")
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


                    });
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
                return res.redirect("/login")
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
                    return res.redirect("/login")

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
