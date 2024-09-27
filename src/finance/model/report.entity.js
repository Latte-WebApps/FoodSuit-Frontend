export class Report {
    constructor({ id = '', date='', description = '', amount = 0, type=''}) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.amount = amount;
        this.type = type;
    }
}