export class Report {
    constructor({ id = '', description='', reportType = '', date = '', amount=0, ordersId = '', productsId = '' }) {
        this.id = id;
        this.description = description;
        this.reportType = reportType;
        this.date = date;
        this.amount = amount;
        this.ordersId = ordersId;
        this.productsId = productsId;
    }
}