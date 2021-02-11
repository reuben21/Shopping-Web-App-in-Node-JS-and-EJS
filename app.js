const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const csrf = require('csurf');
const app = express();
const MongoDBStore = require('connect-mongodb-session')(session)
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_DB_URI = process.env.MONGO_DB_CONNECTION_URL

const store = new MongoDBStore({
    uri: MONGO_DB_URI,
    collection: 'sessions',
});

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/product_image_picker/'));
    },
    filename: (req, file, cb) => {
        const now = new Date().toISOString();
        var date = now.replace(/:/g, '-');
        date = date.replace('.', '-');
        cb(null, date + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error')

const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('product_image_picker'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/product_image_picker', express.static(path.join(__dirname, 'product_image_picker')))
app.use(session({
    secret: 'reuben coutinho',
    resave: false,
    saveUninitialized: false,
    cookie: {isLoggedIn: true},
    store: store
}));

app.use(csrfProtection)


app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {

    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
})


app.use('/admin', adminRoutes);

app.use(shopRoutes);
app.use(authRoutes);


app.get('/500', errorController.get505)
app.use(errorController.get404)


// app.use((error, req, res, next) => {
//     res.redirect('/500')
// })

mongoose.connect(MONGO_DB_URI)
    .then(res => {
        app.listen(process.env.PORT || 5000)
    }).catch(err => {
    console.log(err);
});
