
const products = [];

exports.getAddProduct = (req, res, next) => {
        console.log("Another  Middleware")
        res.render('add-product', {
                pageTitle: 'Add Product',
                path: '/admin/add-product'
            })
    };

exports.postAddProduct = (req, res, next) => {
    products.push({
        title: req.body.product_name,
        price: req.body.product_price
    })
    console.log(products)
    res.redirect(`/`);
}

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
       
      });
}