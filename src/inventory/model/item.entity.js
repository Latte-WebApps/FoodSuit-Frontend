export class Item {
    constructor({id = '', name = '', quantity = 0, image = ''}) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.image = image;
    }
}