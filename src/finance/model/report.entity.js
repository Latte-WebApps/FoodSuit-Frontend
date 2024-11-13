export class Report {
    constructor({ id = '', description='', type = '', date = '', amount=0, ordersId = '', productsId = '' }) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.date = date;
        this.amount = amount;
        this.ordersId = ordersId;
        this.productsId = productsId;
    }
}