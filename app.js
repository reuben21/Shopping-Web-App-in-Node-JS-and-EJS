const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');

const app = express();


app.set('view engine', 'ejs');
app.set('views','views');

const {mongoConnect} = require('./util/database')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))

app.use((req, res,next)=>{
    User.findById("5fe4a8e2c409135c1839c35a")
    .then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    });
    next();
})

app.use('/admin',adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404)
// app.use = (req, res, next) => {
//     res.status(404);
//     res.render('error404', {
//         pageTitle: 'Page Not Found',
//     });
// };

mongoConnect(()=>{
    
    app.listen(3000);
})

