export class Attendance {
    constructor(data) {
        this.id = data.id || null;
        this.employeeId = data.employeeId || null;
        this.name = data.name || '';
        this.dateStart = data.dateStart || '';
        this.dateEnd = data.dateEnd || '';
        this.start = data.start || [];
        this.end = data.end || [];
    }


    isValid() {
        return this.employeeId && this.date && this.start.length > 0 && this.end.length > 0;
    }
}
