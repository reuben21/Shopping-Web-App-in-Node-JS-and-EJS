const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');

const app = express();


app.set('view engine', 'ejs');
app.set('views','views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))


app.use('/admin',adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404)
// app.use = (req, res, next) => {
//     res.status(404);
//     res.render('error404', {
//         pageTitle: 'Page Not Found',
//     });
// };


app.listen(3000);
