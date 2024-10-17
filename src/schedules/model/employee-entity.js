export class Employee {
    constructor({ id = null, name = '', image = '', schedule = '' }) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.schedule = schedule;
    }
}