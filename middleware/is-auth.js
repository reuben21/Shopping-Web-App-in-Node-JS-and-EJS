module.exports = (req, res,next) =>{
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    next();
}

// module.exports = (req, res,next) =>{
//     if (req.session.isLoggedIn) {
//         return res.redirect('/')
//     }
//     next();
// }
