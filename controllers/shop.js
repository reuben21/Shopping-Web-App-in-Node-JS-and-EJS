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
        console.log(product)
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
    req.user.cart.getCart(cart =>{
        Product.fetchAll( products => {
            const cartProducts = [];
            for (each_product in products) {
                const cartProductData = cart.products.find(prod=>prod.id === products[each_product].id);
           
                if (cartProductData){
                   
                    cartProducts.push({
                        productData:products[each_product],
                        qty:cartProductData.qty,
                        totalPrice:cart.totalPrice });
                }

            }
            console.log(cartProducts);
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products:cartProducts,
                totalPrice:cart.totalPrice
              });
        })

    })
   
}

exports.postCart = (req,res,next)=>{
    const product_id = req.body.product_id;
    console.log(product_id)
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
    Product.findById(product_id,(product)=>{
        Cart.deleteProduct(product_id,product.price)
        res.redirect('/cart');
    })
    
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
      });
}
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
      });
}