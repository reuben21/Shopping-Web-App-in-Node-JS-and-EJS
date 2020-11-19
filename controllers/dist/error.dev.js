"use strict";

exports.error404 = function (req, res, next) {
  res.status(404).render('error404', {
    pageTitle: 'Page Not Found'
  });
};