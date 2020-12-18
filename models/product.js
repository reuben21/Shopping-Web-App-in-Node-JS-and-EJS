const products = [];


module.exports = class Product {
    // t - title
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }

    save() {
        products.push(
            {
                title: this.title,
                price: this.price
            });
    }

    static fetchAll() {
        return products;
    }
}
