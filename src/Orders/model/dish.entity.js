export class Dish {
    constructor({id = null, name = '', price = '', category = ''}) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }
}