const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename),
'data','cart.json'
)
const mongodb = require('mongodb');
module.exports = class Cart {
    

    static addProduct(id,productPrice) {
        fs.readFile(p,(err,fileContent) => {
            let cart = {products:[],totalPrice:0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id:id, qty :1}
                cart.products = [ ...cart.products,updatedProduct]
            }
            cart.totalPrice = cart.totalPrice +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id,productPrice) {
        fs.readFile(p,(err,fileContent)=>{
            if(err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent)};
            console.log("This is the Updated Cart ", updatedCart)
            const product  =  updatedCart.products.find(p => p.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(product => product.id !== id );
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p,JSON.stringify(updatedCart),err => {
                console.log(err)
            })
        });
    }

    static getCart(cb){
        fs.readFile(p,(err,fileContent)=>{
        const cart =JSON.parse(fileContent);
        if (err){
            cb(null)
        }else{
            cb(cart)
        }
        
        });

    }
}