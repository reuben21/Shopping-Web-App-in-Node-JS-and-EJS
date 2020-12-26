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
        const cartProductIndex = this.cart.items.findIndex(cp =>{
            console.log(cp.product_id.toString()===product._id.toString())
            return cp.product_id.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items]
        console.log(cartProductIndex);
        if (cartProductIndex >= 0)  {
            newQuantity = this.cart.items[cartProductIndex].quantity +1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
            product_id: new mongodb.ObjectId(product._id),
             quantity:newQuantity
            })
        }
        
       
        const updatedCart = {
            items: updatedCartItems
        };
        const db = getDb();
        
        if (this._id !== null) {
            
            return db.collection("users").updateOne(
                {_id:new mongodb.ObjectId(this._id)},
                { $set:
                    {
                        cart:updatedCart
                    }
                }
                ).then(result=>{
                    
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
            return user;
        }).catch(err => {
            console.log(err);
        })  
    }
}

module.exports = User;