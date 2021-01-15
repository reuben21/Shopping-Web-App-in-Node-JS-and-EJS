const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // console.log(req.get('Cookie'));
        res.render('auth/auth', {
            path:'/login',
            pageTitle: 'Login',
            register:false,
            registerComplete:false,
            isAuthenticated: false
        });

}

exports.getRegister = (req, res, next) => {

    res.render('auth/auth', {
        path:'/register',
        pageTitle: 'Register',
        register:true,
        registerComplete:false,
        isAuthenticated:req.session.isLoggedIn

    });

}
exports.postRegister = (req, res, next) => {
    // console.log(req.user);
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const user_password = req.body.user_password;


    const user = new User({
        name:user_name,
        email:user_email,
        password:user_password,
        cart:{items:[]},

    })

    user.save().then(result=>{

        res.render('auth/auth', {
            path:'/login',
            pageTitle: 'Login',
            register:false,
            registerComplete:true

        });
    })
        .catch(err=>{
            console.log(err)
        });


}

exports.postLogin = (req, res, next) => {

    const user_email = req.body.user_email;
    const user_password = req.body.user_password;
    console.log(user_email, user_password)
    User.findById('5ffa7b7f66acfb081e7c8495').then(user=>{
        req.session.isLoggedIn = true;
        req.session.user = user;

        res.redirect('/');
    })







}

exports.postLogout = (req, res, next) => {

    req.session.destroy((err)=>{
        console.log(err)
        res.redirect('/');
    })



}
