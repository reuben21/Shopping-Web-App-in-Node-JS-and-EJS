"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var app = express();
app.set('view engine', 'pug');
app.set('views', 'view');

var adminData = require('./routes/admin');

var shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, './', 'views', 'errorForNotFound.html'));
});
app.listen(3000);