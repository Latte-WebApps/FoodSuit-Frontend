export class Item {
    constructor({id = '', name = '', quantity = 0, imageUrl = '', price = 0}) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}