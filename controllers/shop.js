const Product = require('../models/product');
const Order = require('../models/order');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const ITEMS_PER_PAGE = 3
// exports.getProducts = (req, res, next) => {
//     const products = Product.fetchAll();
//     res.render('shop', {
//         prods: products,
//         pageTitle: 'Shop',
//         path: '/',

//       });
// }

exports.getProducts = (req, res, next) => {
    var page;
    page = req.query.page;

    if(page === undefined) {
        page =1

    }
    Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .then(
            products => {
                res.render('shop/product-list', {
                    prods: products,
                    pageTitle: 'Shop',
                    path: '/products'


                });
            }
        ).catch(err => {
        const error = new Error(err);
        err.httpStatusCode = 500;
        return next(error);
    });

}

exports.getSingleProduct = (req, res, next) => {
    const product_id = req.params.productId;

    Product.findById(product_id).then(product => {
        res.render('shop/product-detail', {
            prods: product,
            pageTitle: 'Shop',
            path: '/product-detail',


        });
    })


}
exports.getIndex = (req, res, next) => {
    var page;
    page = req.query.page;

    if(page === undefined) {
        page =1

    }
    let total_items;

    Product.find().countDocuments().then(num_of_products => {
        total_items = num_of_products
        return Product.find()
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE)
            .then(
                products => {
                    res.render('shop/index', {
                        prods: products,
                        pageTitle: 'Shop',
                        path: '/',
                        total_products: total_items,
                        currentPage: parseInt(page),
                        hasNextPage: ITEMS_PER_PAGE * parseInt(page) < total_items,
                        hasPreviousPage: parseInt(page) > 1,
                        nextPage: parseInt(page) + 1,
                        previousPage: parseInt(page) - 1,
                        lastPage: Math.ceil(total_items / ITEMS_PER_PAGE)


                    });
                }
            ).catch(err => {
                const error = new Error(err);
                err.httpStatusCode = 500;
                return next(error);
            });
    })


}

exports.getCart = (req, res, next) => {


    req.user
        .populate('cart.items.product_id')
        .execPopulate()
        .then(user => {

            const products = user.cart.items;
            var total = 0;
            products.forEach(product => {
                total += product.quantity + product.product_id.price;
            });

            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: products,
                totalPrice:total
            });
        }).catch(err => {
            const error = new Error(err);
            err.httpStatusCode = 500;
            return next(error);
        }
    );
}


exports.postCart = (req, res, next) => {
    const product_id = req.body.product_id;
    Product.findById(product_id).then((product) => {
        return req.user.addToCart(product);
        // Cart.addProduct(product_id,product.price)
    }).then(result => {
            // console.log(result);
        }
    )
    res.redirect('/');
}

exports.getDeleteItemFromCart = (req, res, next) => {
    const product_id = req.params.productId;
    req.user.deleteItemFromCart(product_id).then(result => {
        res.redirect('/cart');
    }).catch(err => {
        const error = new Error(err);
        err.httpStatusCode = 500;
        return next(error);
    });


}
exports.postOrders = (req, res, next) => {
    let products;
    let total = 0;
    req.user
        .populate('cart.items.product_id')
        .execPopulate()
        .then(user => {
            // console.log(user.cart.items);
            const products = user.cart.items.map(i => {
                return {quantity: i.quantity, product: {...i.product_id._doc}}
            });
            const order = new Order({
                user: {
                    name: req.session.user.name,
                    user_id: req.session.user
                },
                products: products
            })
            return order.save();

        }).then(result => {
        req.user.clearCart();
        res.redirect('/orders');
    }).catch(err => {

        const error = new Error(err);
        err.httpStatusCode = 500;
        return next(error);
    });
}
exports.getOrders = (req, res, next) => {
    Order.find({'user.user_id': req.user._id}).then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Orders',
            orders: orders,
            isAuthenticated: req.session.isLoggedIn,
            csrfToken: req.csrfToken()
        });
    });


}
exports.getCheckout = (req, res, next) => {
    let products;
    let total = 0;

    req.user
        .populate('cart.items.product_id')
        .execPopulate()
        .then(user => {
            products = user.cart.items;
            total = 0;
            products.forEach(product => {
                total += product.quantity + product.product_id.price;
            });

            return stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: products.map(p => {
                    return {
                        name: p.product_id.title,
                        amount: parseInt(p.product_id.price)*100,
                        currency: 'inr',
                        quantity: p.quantity,
                    };
                }),
                success_url: req.protocol + '://' + req.get('host') + '/checkout/success',
                cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel',
            })

        }).then(session => {
        res.render('shop/checkout', {
            pageTitle: 'Checkout',
            path: '/checkout',
            products: products,
            totalPrice: total,
            sessionId: session.id
        });
    }).catch(err => {
            const error = new Error(err);
            err.httpStatusCode = 500;
            return next(error);
        }
    );

}


exports.getInvoice = (req, res, next) => {
    const order_id = req.params.orderId;
    Order.findById(order_id).then(order => {
        if (!order) {
            return next(new Error('No Order Found.!'));
        }
        if (order.user.user_id.toString() !== req.user._id.toString()) {
            return next(new Error('Unauthorized!'));

        }
        const invoice_name = 'invoice-' + order_id + '.pdf'
        const invoicePath = path.join('data', 'invoices', invoice_name);
        // fs.readFile(invoicePath, (err, data) => {
        //     if (err) {
        //         console.log(err)
        //         return next(err);
        //     }
        //     res.setHeader('Content-Type', 'application/pdf');
        //     res.setHeader('Content-Disposition', 'inline; filename="' + invoice_name + '"');
        //     res.send(data);
        // })
        const pdfDoc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + invoice_name + '"');

        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);
        // pdfDoc.;
        pdfDoc.font('Courier');
        pdfDoc.fontSize(20).text('Invoice', {
            underline: true,
            align: 'center'
        })
        pdfDoc.moveDown(0.3);
        pdfDoc.fontSize(12).text(`Name:- ${req.user.name}`, {
            align: 'center'
        })
        pdfDoc.moveDown(0.3);
        pdfDoc.fontSize(12).text(`Email-Id:- ${req.user.email}`, {
            align: 'center'
        })
        pdfDoc.moveDown(0.3);
        pdfDoc.text('\n---------------------------------------')

        pdfDoc.moveDown(0.3);
        let yPos = pdfDoc.y;
        pdfDoc
            .fontSize(15)
            .text(`Product Name`, (x = 80), (y = yPos))
            .text(`Quantity`, (x = 300), (y = yPos))
            // .image(product.image, 320, 15, {fit: [100, 100]})
            // .rect(320, 15, 100, 100)
            // .stroke()
            // .text('Fit', 320, 0)
            .text(
                `Price`,
                (x = 475),
                (y = yPos),
                {align: 'right'}
            );
        pdfDoc.moveDown(0.3);
        var total = 0;
        order.products.forEach(product => {

            total = total + product.product.price;
            yPos = pdfDoc.y;
            pdfDoc
                .fontSize(15)

                .text(`${product.product.title.trim()}`, (x = 80), (y = yPos))
                .text(product.quantity, (x = 300), (y = yPos))
                // .image(product.image, 320, 15, {fit: [100, 100]})
                // .rect(320, 15, 100, 100)
                // .stroke()
                // .text('Fit', 320, 0)
                .text(
                    `${product.product.price}$`,
                    (x = 475),
                    (y = yPos),
                    {align: 'right'}
                );


        })
        pdfDoc.moveDown(0.3);
        pdfDoc
            .fontSize(15)
            .text(`Total Price :`, (x = 80), (y = yPos + 50))
            .font('Courier-Bold')
            .text(`${total}$`, (x = 200), (y = yPos + 50))
        ;

        pdfDoc.end();

        // res
        //
        //
        // const file = fs.createReadStream(invoicePath);
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'inline; filename="' + invoice_name + '"');
        // file.pipe(res);
    }).catch(err => console.log(err));

    // res.render('shop/checkout', {
    //     pageTitle: 'Checkout',
    //     path: '/checkout',
    //     isAuthenticated: req.session.isLoggedIn,
    //     csrfToken: req.csrfToken()
    // });
}
