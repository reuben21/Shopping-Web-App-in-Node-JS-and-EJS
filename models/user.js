const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            product_id: {
                type: Schema.Types.ObjectId,
                ref: 'Product'

            },
            quantity: {type: Number, required: true}
        }]
    }

})

userSchema.methods.addToCart = function(product){
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
                product_id:product._id,
             quantity:newQuantity
            })
        }


        const updatedCart = {
            items: updatedCartItems
        };
        this.cart = updatedCart;
        return this.save();
}

module.exports = mongoose.model('User', userSchema);


// const mongodb = require('mongodb');
// const { getDb }= require('../util/database');
//
//
// class User {
//
//     constructor(username, email,password,cart,id) {
//         this.username = username;
//         this.email = email;
//         this.password = password;
//         this.cart = cart;
//         this._id = id;
//     }
//
//     save() {
//         const db = getDb();
//         if (this._id === null) {
//             return db.collection("users").insertOne(this).then(result=>{
//             }).catch(err => {
//                 console.log(err);
//             });
//         }
//
//
//
//     }
//
//     addToCart(product) {
//
//     }
//
//     getCart() {
//         const db = getDb();
//         const product_id = this.cart.items.map (i=>{
//             return i.product_id;
//         })
//         return db.collection("products").find(
//             {_id:{$in: product_id}}
//         ).toArray().then(products=>{
//             return products.map(p=>{
//                 return {...p,quantity:this.cart.items.find(i=>{
//                     return i.product_id.toString() === p._id.toString();
// p
//                 }).quantity
//             };
//             })
//         })
//         // return this.cart;
//     }
//
//     deleteItemFromCart(product_id) {
//         const updatedCartItems = this.cart.items.filter(item=>{
//             console.log(item.product_id.toString(),product_id.toString())
//         return item.product_id.toString() !== product_id.toString();
//         })
//         const db = getDb();
//         return db.collection("users")
//                 .updateOne({
//                     _id: new mongodb.ObjectId(this._id)},
//                     {$set: {cart:{items: updatedCartItems}}}
//                 );
//
//     }
//
//
//     addOrder() {
//
//         const db =getDb();
//         return this.getCart().then(products=>{
//             const order = {
//                 items:products,
//                 user :{
//                     _id:new mongodb.ObjectId(this._id),
//                     email: this.email
//                 }
//             };
//             return db.collection('orders')
//             .insertOne(order);
//         }).then(result =>{
//             this.cart = {items:[]};
//             return db.collection('users').updateOne(
//                 {_id : new mongodb.ObjectId(this._id)},
//                 {$set: {cart:{items:[]}}}
//             );
//         });
//
//     }
//
//     getOrder() {
//         const db = getDb();
//         return db.collection("orders").find({
//             "user._id":  new mongodb.ObjectId(this._id)})
//             .toArray();
//     }
//
//     static findById(user_id){
//         const db = getDb();
//         return db.collection("users")
//         .findOne({_id:new mongodb.ObjectId(user_id)})
//         .then(user => {
//             return user;
//         }).catch(err => {
//             console.log(err);
//         })
//     }
// }
//
// module.exports = User;
