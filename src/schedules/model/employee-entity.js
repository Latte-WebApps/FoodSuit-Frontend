export class Employee {
    constructor({ id = null, name = '', image = '', entryTime = '' , exitTime = '' }) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.entryTime = entryTime;
        this.exitTime = exitTime;
    }
}