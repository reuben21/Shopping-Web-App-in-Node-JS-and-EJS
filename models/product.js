const products = [];
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename),
'data','products.json'
)


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
    constructor(t, p,imgUrl,description) {
        this.title = t;
        this.price = p;
        this.imgUrl = imgUrl;
        this.description = description;
        
    }

    save() {

        getProductsFromFile(products=>{
            products.push(
                {
                    title: this.title,
                    price: this.price,
                    image_url: this.imgUrl,
                    description: this.description
                });


            fs.writeFile(p,JSON.stringify(products),err => {
                console.log(err)
            });
        })

        // products.push(
        //     {
        //         title: this.title,
        //         price: this.price
        //     });

    }

    // TO FETCH ALL FROM THE ./DATA/products.json
    static fetchAll(cb) {
        getProductsFromFile(cb)
        // return products;
    }
}
