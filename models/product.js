const products = [];
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename),
'data','products.json'
)

const Cart = require('./cart');
const mongodb = require('mongodb');
const { getDb }= require('../util/database');

const getProductsFromFile = (cb)=>{
    fs.readFile(p,(err,fileContent) => {
        if (err) {
           return cb([]);
        } else {
            cb(JSON.parse(fileContent));

        }
    })
}

module.exports = class Product {
    // t - title
    constructor(id,t, p,imgUrl,description) {
        this._id = id;
        this.title = t;
        this.price = p;
        this.image_url = imgUrl;
        this.description = description;
        
    }

    save() {
        const db = getDb();
        if (this._id === null) {
            return db.collection("products").insertOne({
                title:this.title,
                price:this.price,
                image_url:this.image_url,
                description:this.description
            }).then(result=>{
                console.log(result);
            }).catch(err => {
                console.log(err);
            })  
        }
       
        


    }

    // TO FETCH ALL FROM THE ./DATA/products.json
    static fetchAll(cb) {
        const db = getDb();
        return db.collection("products")
        .find()
        .toArray()
        .then(products=>{
            return products
        })
        .catch(err=>{
            console.log(err);
        });
        // return products;
    }

    static findById(id) {
        const db = getDb();
        return db.collection("products")
        .find({_id:mongodb.ObjectId(id)}).next()
        .then(product=>{
            console.log(product)
            return product
        })
        .catch(err=>{
            console.log(err);
        });
      
    }

    static deleteById(id) {
        getProductsFromFile(products=>{
            const product = products.find(p => p.id === id);
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(p,JSON.stringify(updatedProducts),err =>{
                if(!err) {
                    Cart.deleteProduct(id,product.price);
                }
            })

            // cb(product);
        })
    }
}
