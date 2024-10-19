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
      employees: [], // Lista completa de empleados
      attendances: [], // Lista de asistencias registradas
      attendance: { employeeId: null, name: '', date: '', start: [{ hour: '' }], end: [{ hour: '' }] }, // Datos de la asistencia
      attendanceDialogVisible: false, // Controla la visibilidad del cuadro flotante
      isEdit: false // Controla si estamos en modo edición
    };
  },
  mounted() {
    this.loadEmployees(); // Cargar empleados
    this.loadAttendances(); // Cargar asistencias registradas
  },
  methods: {
    // Cargar todos los empleados
    loadEmployees() {
      EmployeeService.getAll().then(response => {
        this.employees = response.data;
      }).catch(error => {
        console.error("Error loading employees:", error);
      });
    },

    // Cargar todas las asistencias
    loadAttendances() {
      AttendanceService.getAll().then(response => {
        this.attendances = response.data;
      }).catch(error => {
        console.error("Error loading attendances:", error);
      });
    },

    // Iniciar un nuevo registro de asistencia
    onNewAttendance() {
      this.attendance = { employeeId: null, name: '', date: new Date().toISOString().split('T')[0], start: [{ hour: '' }], end: [{ hour: '' }] };
      this.isEdit = false;
      this.attendanceDialogVisible = true;
    },

    // Editar un registro de asistencia existente
    onEditAttendance(attendance) {
      this.attendance = { ...attendance };
      this.isEdit = true;
      this.attendanceDialogVisible = true;
    },

    // Guardar el registro de asistencia (crear o actualizar)
    onSaveAttendance() {
      const selectedEmployee = this.employees.find(emp => emp.id === this.attendance.employeeId);
      if (selectedEmployee) {
        this.attendance.name = selectedEmployee.name; // Asignar nombre automáticamente
      }

      if (this.isEdit) {
        // Actualizar asistencia
        AttendanceService.update(this.attendance.id, this.attendance).then(() => {
          this.loadAttendances();
          this.attendanceDialogVisible = false;
        });
      } else {
        // Crear nueva asistencia
        AttendanceService.create(this.attendance).then(() => {
          this.loadAttendances();
          this.attendanceDialogVisible = false;
        });
      }
    },

    // Eliminar un registro de asistencia
    onDeleteAttendance(id) {
      AttendanceService.delete(id).then(() => {
        this.loadAttendances();
      }).catch(error => {
        console.error("Error deleting attendance:", error);
      });
    },

    // Cancelar la creación o edición
    onCancelAttendance() {
      this.attendanceDialogVisible = false;
    }
  }
};
</script>

<template>
  <div class="attendance-management">
    <h2>Attendance Management</h2>

    <!-- Tabla para mostrar asistencia registrada -->
    <table class="attendance-table">
      <thead>
      <tr>
        <th>Employee</th>
        <th>Date</th>
        <th>Start</th>
        <th>End</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="attendance in attendances" :key="attendance.id">
        <td>{{ attendance.name }}</td>
        <td>{{ attendance.date }}</td>
        <td>{{ attendance.start[0].hour }}</td>
        <td>{{ attendance.end[0].hour }}</td>
        <td>
          <button @click="onEditAttendance(attendance)">Edit</button>
          <button @click="onDeleteAttendance(attendance.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Botón para registrar una nueva asistencia -->
    <div class="actions">
      <button @click="onNewAttendance">New Attendance</button>
    </div>

    <!-- Cuadro flotante para crear o editar asistencia -->
    <pv-dialog v-model:visible="attendanceDialogVisible" header="Attendance Form" modal>
      <div class="p-fluid">
        <div class="field mt-5">
          <label for="employee">Employee</label>
          <select v-model="attendance.employeeId">
            <option v-for="employee in employees" :key="employee.id" :value="employee.id">
              {{ employee.name }}
            </option>
          </select>
        </div>
        <div class="field mt-5">
          <label for="start">Start</label>
          <input type="time" v-model="attendance.start[0].hour">
        </div>
        <div class="field mt-5">
          <label for="end">End</label>
          <input type="time" v-model="attendance.end[0].hour">
        </div>
      </div>

      <template #footer>
        <button @click="onSaveAttendance">Save</button>
        <button @click="onCancelAttendance">Cancel</button>
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
.attendance-management {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
}

.attendance-table th,
.attendance-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.actions {
  margin-top: 20px;
}

.actions button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.actions button:hover {
  background-color: #0056b3;
}

.pv-dialog {
  max-width: 400px;
}

.pv-dialog .p-fluid {
  display: flex;
  flex-direction: column;
}

.pv-dialog .p-fluid .field {
  margin-bottom: 10px;
}

.pv-dialog .p-fluid label {
  margin-bottom: 5px;
}

.pv-dialog .p-fluid input[type="time"],
.pv-dialog .p-fluid select {
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.pv-dialog .p-fluid select {
  background-color: white;
}

.pv-dialog button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pv-dialog button:hover {
  background-color: #0056b3;
}

.pv-dialog .cancel-button {
  background-color: #6c757d;
}

.pv-dialog .cancel-button:hover {
  background-color: #5a6268;
}

</style>