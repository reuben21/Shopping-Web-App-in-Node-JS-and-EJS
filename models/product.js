const products = [];
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename),
'data','products.json'
)

const Cart = require('./cart');
const mongodb = require('mongodb');
const { getDb }= require('../util/database');



module.exports = class Product {
    // t - title
    constructor(id,t, p,imgUrl,description,user_id) {
        this._id = id;
        this.title = t;
        this.price = p;
        this.image_url = imgUrl;
        this.description = description;
        this.user_id = user_id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id === null) {
            return db.collection("products").insertOne(this).then(result=>{
               
            }).catch(err => {s
                console.log(err);
            })  
        } else {
            return db.collection("products").updateOne({
                _id:new mongodb.ObjectId(this._id)},
                {
                    $set:{
                title:this.title,
                price:this.price,
                image_url:this.image_url,
                description:this.description
                    }
                
            }).then(result=>{
                
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
        .find({_id:new mongodb.ObjectId(id)}).next()
        .then(product=>{
            // console.log(product)
            return product
        })
        .catch(err=>{
            console.log(err);
        });
      
    }

    static deleteById(id) {
        const db = getDb();
        return db.collection("products")
        .deleteOne({_id:new mongodb.ObjectId(id)})
        .then(result=>{
            // console.log("Deleted")
        })
        .catch(err=>{
            console.log(err);
        });
       
    }
}
