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
    constructor(id,t, p,imgUrl,description) {
        this.id = id;
        this.title = t;
        this.price = p;
        this.image_url = imgUrl;
        this.description = description;
        
    }

    save() {
       
        
        getProductsFromFile(products=>{

            if (this.id) {
                const existingProductIndex = products.findIndex(p=>p.id === this.id)
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p,JSON.stringify(updatedProducts),err => {
                    console.log(err)
                });
            } else {
            this.id = Math.random().toString();
            products.push(
                {
                    id: this.id,
                    title: this.title,
                    price: this.price,
                    image_url: this.imgUrl,
                    description: this.description
                });
            fs.writeFile(p,JSON.stringify(products),err => {
                console.log(err)
            });
        }
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

    static findById(id,cb) {
        getProductsFromFile(products=>{
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }
}
