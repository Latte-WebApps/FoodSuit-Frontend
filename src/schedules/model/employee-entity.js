export class Employee {
    constructor({ id = null, firstName = '', lastName = '', entryTime = '' , exitTime = '' }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.entryTime = entryTime;
        this.exitTime = exitTime;
    }
}