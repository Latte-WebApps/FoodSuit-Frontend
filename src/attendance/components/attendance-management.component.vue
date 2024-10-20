<script>
import EmployeeService from "../../reports/services/employees.service.js";
import AttendanceService from "../services/attendance.service";
import Dialog from "primevue/dialog";

export default {
  name: "attendance-management",
  components: {
    'pv-dialog': Dialog
  },
  data() {
    return {
      employees: [],
      attendances: [],
      attendance: { employeeId: null, name: '', 'date-start': '', 'date-end': '', start: [{ hour: '' }], end: [{ hour: '' }] },
      attendanceDialogVisible: false,
      isEdit: false
    };
  },
  mounted() {
    this.loadEmployees();
    this.loadAttendances();
  },
  methods: {
    loadEmployees() {
      EmployeeService.getAll().then(response => {
        this.employees = response.data;
      }).catch(error => {
        console.error("Error loading employees:", error);
      });
    },

    loadAttendances() {
      AttendanceService.getAll().then(response => {
        this.attendances = response.data;
      }).catch(error => {
        console.error("Error loading attendances:", error);
      });
    },

    onNewAttendance() {
      this.attendance = { id: null, employeeId: null, name: '', 'date-start': '', 'date-end': '', start: [{ hour: '' }], end: [{ hour: '' }] };
      this.isEdit = false;
      this.attendanceDialogVisible = true;
    },

    onEditAttendance(attendance) {
      this.attendance = { ...attendance };
      this.isEdit = true;
      this.attendanceDialogVisible = true;
    },

    onSaveAttendance() {
      const selectedEmployee = this.employees.find(emp => emp.id === this.attendance.employeeId);
      if (selectedEmployee) {
        this.attendance.name = selectedEmployee.name;
      }

      if (this.isEdit) {
        AttendanceService.update(this.attendance.id, this.attendance).then(() => {
          this.loadAttendances();
          this.attendanceDialogVisible = false;
        });
      } else {
        AttendanceService.create(this.attendance).then(() => {
          this.loadAttendances();
          this.attendanceDialogVisible = false;
        });
      }
    },

    onDeleteAttendance(id) {
      AttendanceService.delete(id).then(() => {
        this.loadAttendances();
      }).catch(error => {
        console.error("Error deleting attendance:", error);
      });
    },

    onCancelAttendance() {
      this.attendanceDialogVisible = false;
    }
  }
};
</script>

<template>
  <div class="attendance-management">
    <h2 class="attendance-title">Attendance Management</h2>

    <!-- Tabla para mostrar la asistencia -->
    <table class="attendance-table">
      <thead>
      <tr>
        <th>Employee</th>
        <th>Date Start</th>
        <th>Date End</th>
        <th>Start</th>
        <th>End</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="attendance in attendances" :key="attendance.id">
        <td>{{ attendance.name }}</td>
        <td>{{ attendance['date-start'] }}</td>
        <td>{{ attendance['date-end'] }}</td>
        <td>{{ attendance.start[0].hour }}</td>
        <td>{{ attendance.end[0].hour }}</td>
        <td>
          <button @click="onEditAttendance(attendance)" class="btn-edit">Edit</button>
          <button @click="onDeleteAttendance(attendance.id)" class="btn-delete">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Botón para crear nuevo registro de asistencia -->
    <div class="actions">
      <button @click="onNewAttendance" class="btn-new-attendance">New Attendance</button>
    </div>

    <!-- Dialogo para crear/editar asistencia -->
    <pv-dialog v-model:visible="attendanceDialogVisible" header="Attendance Form" modal>
      <div class="p-fluid">
        <div class="field">
          <label for="employee">Employee</label>
          <select v-model="attendance.employeeId" id="employee" class="dropdown">
            <option v-for="employee in employees" :key="employee.id" :value="employee.id">
              {{ employee.name }}
            </option>
          </select>
        </div>
        <div class="field">
          <label for="date-start">Date Start</label>
          <input type="date" v-model="attendance['date-start']" id="date-start" class="date-input" />
        </div>
        <div class="field">
          <label for="date-end">Date End</label>
          <input type="date" v-model="attendance['date-end']" id="date-end" class="date-input" />
        </div>
        <div class="field">
          <label for="start">Start</label>
          <input type="time" v-model="attendance.start[0].hour" id="start" class="time-input" />
        </div>
        <div class="field">
          <label for="end">End</label>
          <input type="time" v-model="attendance.end[0].hour" id="end" class="time-input" />
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
