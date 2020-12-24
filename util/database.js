const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const uri = "mongodb+srv://user_for_node:7uFBJ7025U5qD5Av@mongodb.syifj.mongodb.net/Shopping_Store?retryWrites=true&w=majority";

const mongoConnect =(callback)=>{

    MongoClient.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(client =>{
        console.log("Connected")
        _db = client.db()
        callback(client);
    })
    .catch(err=>{
        console.log(err)
    })
    
}

const getDb =() =>{
    if (_db) {
        return _db;
    }
    throw 'No Database Found'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
