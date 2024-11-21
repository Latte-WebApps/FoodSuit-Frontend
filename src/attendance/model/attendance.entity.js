export class Attendance {
    constructor(data) {
        this.id = data.id || null;
        this.employeeId = data.employeeId || null;
        this.date = data.date || ""; // Formato: dd/MM/yyyy
        this.checkInTime = data.checkInTime || ""; // Formato: HH:mm
        this.checkOutTime = data.checkOutTime || ""; // Formato: HH:mm
    }

    // Validación para asegurarse de que los campos necesarios estén completos
    isValid() {
        return (
            this.employeeId &&
            this.date &&
            this.checkInTime &&
            (!this.checkOutTime || this.checkOutTime.length > 0)
        );
    }
}
