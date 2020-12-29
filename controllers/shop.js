const Product = require('../models/product');
const Cart = require('../models/cart');

// exports.getProducts = (req, res, next) => {
//     const products = Product.fetchAll();
//     res.render('shop', {
//         prods: products,
//         pageTitle: 'Shop',
//         path: '/',

//       });
// }

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(
         products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/products',

              });
        }
    ).catch(err => {
        console.log(err);
    });

}

exports.getSingleProduct = (req, res, next) => {
   const product_id = req.params.productId;
   console.log(product_id)
    Product.findById(product_id).then(product => {
        res.render('shop/product-detail', {
            prods: product,
            pageTitle: 'Shop',
            path: '/product-detail',
        
            });
    })

      

}
exports.getIndex = (req, res, next)=>{
    Product.fetchAll().then(
        products => {
           res.render('shop/product-list', {
               prods: products,
               pageTitle: 'Shop',
               path: '/products',

             });
       }
   ).catch(err => {
       console.log(err);
   });
}

exports.getCart = (req, res, next) => {
    req.user.getCart().then(products => {
        
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products:products
                // totalPrice:cart.totalPrice
              });
        }).catch(err => console.log(err));
}
   


exports.postCart = (req,res,next)=>{
    const product_id = req.body.product_id;
    Product.findById(product_id).then((product)=>{
        return req.user.addToCart(product);
        // Cart.addProduct(product_id,product.price)
    }).then(result=>{
        console.log(result);
    }
        
        )
    res.redirect('/');
}

exports.getDeleteItemFromCart = (req, res, next) => {
    const product_id = req.params.productId;
    req.user.deleteItemFromCart(product_id).then(result=>{
        res.redirect('/cart');
    }).catch(err => console.log(err));
   
    
}
exports.postOrders = (req, res, next) => {
    let fetchedCart ;
    req.user
    .addOrder()
    .then(
        result=>{
        res.redirect('/orders')
    }).catch(err => console.log(err));
    // res.render('shop/orders', {
    //     pageTitle: 'Orders',
    //     path: '/orders',
    //   });
}
exports.getOrders = (req, res, next) => {
    req.user
    .getOrder().then(orders=>{
        res.render('shop/orders', {
            path:'/orders',
            pageTitle: 'Orders',
            orders:orders
          });
    })
   
}
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
      });
}