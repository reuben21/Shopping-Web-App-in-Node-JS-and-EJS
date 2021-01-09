const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();


app.set('view engine', 'ejs');
app.set('views','views');

const {mongoConnect} = require('./util/database')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error')

// const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))

// app.use((req, res,next)=>{
//     User.findById("5fe4a8e2c409135c1839c35a")
//     .then(user => {
//         req.user =new User (user.username,user.email,user.password,user.cart,user._id);
//         next();
//     }).catch(err => {
//         console.log(err);
//     });
// })

app.use('/admin',adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404)
// app.use = (req, res, next) => {
//     res.status(404);
//     res.render('error404', {
//         pageTitle: 'Page Not Found',
//     });
// };

mongoose.connect('mongodb+srv://user_for_node:7uFBJ7025U5qD5Av@mongodb.syifj.mongodb.net/Shopping_Store?retryWrites=true&w=majority')
    .then(res =>{
        app.listen(3000);
    }).catch(err =>{
    console.log(err);
});




