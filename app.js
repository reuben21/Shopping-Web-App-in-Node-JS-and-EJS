const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();


app.set('view engine', 'ejs');
app.set('views','views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error')

const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))

app.use((req, res, next) => {
    User.findById("5ffa7b7f66acfb081e7c8495")
        .then(user => {
            req.user = user;
            next();
        }).catch(err => {
        console.log(err);
    });
})

app.use('/admin', adminRoutes);
app.use(session({
    secret: 'reubencoutinho',
    resave: false,
    saveUninitialized: false
}))
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404)
// app.use = (req, res, next) => {
//     res.status(404);
//     res.render('error404', {
//         pageTitle: 'Page Not Found',
//     });
// };

mongoose.connect('mongodb+srv://user_for_node:7uFBJ7025U5qD5Av@mongodb.syifj.mongodb.net/Shopping_Store?retryWrites=true&w=majority')
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




