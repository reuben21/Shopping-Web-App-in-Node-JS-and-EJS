"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var expressHbs = require('express-handlebars');

var app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

var adminData = require('./routes/admin');

var shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use(function (req, res, next) {
  res.status(404).render('error404', {
    pageTitle: 'Page Not Found'
  });
});
app.listen(3000);