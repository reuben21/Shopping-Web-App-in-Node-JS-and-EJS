const products = [];
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename),
'data','products.json'
)
module.exports = class Product {
    // t - title
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }

    save() {
       
        fs.readFile(p,(err,fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(
                {
                    title: this.title,
                    price: this.price
                });
            
            
            fs.writeFile(p,JSON.stringify(products),err => {
                console.log(err)
            })
           
            
        })
        // products.push(
        //     {
        //         title: this.title,
        //         price: this.price
        //     });
        
    }

    static fetchAll(cb) {
        fs.readFile(p,(err,fileContent) => {
            if (err) { 
                cb([]); 
            }
           cb(JSON.parse(fileContent));
        })
        // return products;
    }
}
