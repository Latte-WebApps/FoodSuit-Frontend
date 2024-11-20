export class Dish {
    constructor({id = null, name = '', price = '', category = '', products = []}) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.products = [];
    }
}