<script>
import EmployeeService from "../../reports/services/employees.service.js";
import AttendanceService from "../services/attendance.service";
import { Attendance } from "../model/attendance.entity.js";

export default {
  name: "attendance-management",
  data() {
    return {
      employees: [],
      attendances: [],
      attendance: new Attendance({}),
      attendanceDialogVisible: false,
      isEdit: false,
      submitted: false,
    };
  },
  mounted() {
    this.loadEmployees();
    this.loadAttendances();
  },
  methods: {
    loadEmployees() {
      EmployeeService.getAll()
          .then((response) => {
            this.employees = response.data;
          })
          .catch((error) => {
            console.error("Error loading employees:", error);
          });
    },

    loadAttendances() {
      AttendanceService.getAll()
          .then((response) => {
            this.attendances = response.data;
          })
          .catch((error) => {
            console.error("Error loading attendances:", error);
          });
    },

    onNewAttendance() {
      this.attendance = new Attendance({});
      this.isEdit = false;
      this.attendanceDialogVisible = true;
    },

    onEditAttendance(attendance) {
      this.attendance = new Attendance({ ...attendance });
      this.isEdit = true;
      this.attendanceDialogVisible = true;
    },

    onSaveAttendance() {
      this.submitted = true;

      // Validar que el empleado esté seleccionado
      if (!this.attendance.employeeId) {
        alert("Please select a valid employee.");
        return;
      }

      // Asegurarse de que los datos sean válidos antes de enviarlos
      if (!this.attendance.isValid()) {
        alert("All fields must be filled correctly.");
        return;
      }

      if (this.isEdit) {
        AttendanceService.update(this.attendance.id, this.attendance)
            .then(() => {
              this.loadAttendances();
              this.attendanceDialogVisible = false;
            })
            .catch((error) => {
              console.error("Error updating attendance:", error);
            });
      } else {
        AttendanceService.create(this.attendance)
            .then(() => {
              this.loadAttendances();
              this.attendanceDialogVisible = false;
            })
            .catch((error) => {
              console.error("Error creating attendance:", error);
            });
      }
    },

    onDeleteAttendance(id) {
      AttendanceService.delete(id)
          .then(() => {
            this.loadAttendances();
          })
          .catch((error) => {
            console.error("Error deleting attendance:", error);
          });
    },

    onCancelAttendance() {
      this.attendanceDialogVisible = false;
      this.submitted = false;
    },
  },
};
</script>

<template>
  <div class="attendance-management">
    <h2 class="attendance-title">Attendance Management</h2>

    <table class="attendance-table">
      <thead>
      <tr>
        <th>Employee</th>
        <th>Date</th>
        <th>Check-In Time</th>
        <th>Check-Out Time</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="attendance in attendances" :key="attendance.id">
        <td>{{ attendance.employeeId }}</td>
        <td>{{ attendance.date }}</td>
        <td>{{ attendance.checkInTime }}</td>
        <td>{{ attendance.checkOutTime }}</td>
        <td>
          <button @click="onEditAttendance(attendance)" class="btn-edit">
            Edit
          </button>
          <button @click="onDeleteAttendance(attendance.id)" class="btn-delete">
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="actions">
      <button @click="onNewAttendance" class="btn-new-attendance">
        New Attendance
      </button>
    </div>

    <pv-dialog v-model:visible="attendanceDialogVisible" header="Attendance Form" modal>
      <div class="p-fluid">
        <div class="field">
          <label for="employee">Employee</label>
          <select v-model="attendance.employeeId" id="employee" class="dropdown">
            <option v-for="employee in employees" :key="employee.id" :value="employee.id">
              {{ employee.fullName || `${employee.firstName} ${employee.lastName}` }}
            </option>
          </select>
        </div>
        <div class="field">
          <label for="date">Date</label>
          <input type="date" v-model="attendance.date" id="date" class="date-input" />
        </div>
        <div class="field">
          <label for="check-in-time">Check-In Time</label>
          <input type="time" v-model="attendance.checkInTime" id="check-in-time" class="time-input" />
        </div>
        <div class="field">
          <label for="check-out-time">Check-Out Time</label>
          <input type="time" v-model="attendance.checkOutTime" id="check-out-time" class="time-input" />
        </div>
        <div class="dialog-actions">
          <button @click="onSaveAttendance" class="btn-save">Save</button>
          <button @click="onCancelAttendance" class="btn-cancel">Cancel</button>
        </div>
      </div>
    </pv-dialog>
  </div>
</template>





<style scoped>
.attendance-management {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.attendance-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.attendance-table th,
.attendance-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.attendance-table th {
  background-color: #f5f5f5;
}

.field {
  margin-bottom: 15px;
}

.dropdown {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}

.date-input,
.time-input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}

.dialog-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-edit,
.btn-delete {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-delete {
  background-color: #dc3545;
  margin-left: 5px;
}

.btn-save {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-new-attendance {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.btn-new-attendance:hover {
  background-color: #0056b3;
}
</style>
