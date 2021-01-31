
exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path:"/404",
        text_message:"404 Page Error"
    });
};

exports.get505 = (req, res, next) => {
    res.status(505).render('505', {
        pageTitle: 'Page Not Found',
        path:"/505",

    });
};
