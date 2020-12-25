const mongodb = require('mongodb');
const { getDb }= require('../util/database');


class User {

    constructor(username, email,password,cart,id) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        if (this._id === null) {
            return db.collection("users").insertOne(this).then(result=>{
            }).catch(err => {
                console.log(err);
            });  
        }
     

       
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(cp =>{
        //     return cp._id === product._id
        // });

    
        const updatedCart = {items: [{ ...product, quantity:1 }]};
        const db = getDb();
        if (this._id === null) {
            return db.collection("users").updateOne({_id:new mongodb.ObjectId(this._id)},{ $set:{cart:updatedCart}}).then(result=>{
            }).catch(err => {
                console.log(err);
            });  
        }
    }
    static findById(user_id){
        const db = getDb();
        return db.collection("users")
        .findOne({_id:new mongodb.ObjectId(user_id)})
        .then(user => {
            console.log(user)
            return user;
        }).catch(err => {
            console.log(err);
        })  
    }
}

module.exports = User;