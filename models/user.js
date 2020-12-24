const mongodb = require('mongodb');
const { getDb }= require('../util/database');


class User {

    constructor(username, email,password) {
        this.username = username;
        this.email = email;
        this.password = password;
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

    static findById(user_id){
        const db = getDb();
        return db.collection("users")
        .findOne({_id:new mongodb.ObjectId(id)})
        .then(result=>{
        }).catch(err => {
            console.log(err);
        })  
    }
}

module.exports = User;