const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const csrf = require('csurf');
const app = express();
const MongoDBStore = require('connect-mongodb-session')(session)

const MONGO_DB_URI = 'mongodb+srv://user_for_node:7uFBJ7025U5qD5Av@mongodb.syifj.mongodb.net/Shopping_Store?retryWrites=true&w=majority'

const store = new MongoDBStore({
    uri: MONGO_DB_URI,
    collection: 'sessions',

});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error')

const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))
app.use(session({
    secret: 'reuben coutinho',
    resave: false,
    saveUninitialized: false,
    cookie: { isLoggedIn:true },
    store: store
}));

app.use(csrfProtection)

app.use((req, res, next) => {

    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRoutes);

app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404)
// app.use = (req, res, next) => {
//     res.status(404);
//     res.render('error404', {
//         pageTitle: 'Page Not Found',
//     });
// };

mongoose.connect(MONGO_DB_URI)
    .then(res =>{
        // const user = new User ({
        //     name:'Reuben Coutinho',
        //     email:"reuben211999@gmail.com",
        //     password:'1234',
        //     cart:{
        //         items:[]
        //     }});
        //     user.save();


        app.listen(3000);
    }).catch(err =>{
    console.log(err);
});




