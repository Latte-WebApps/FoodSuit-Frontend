<script>
import CreateAndEditComponent from "../../shared/components/create-and-edit.component.vue";
import EmployeeService from "../services/employees.service.js";

export default {
  name: "top-employees",
  components: { CreateAndEdit },
  data() {
    return {
      employees: [], // Lista de empleados (solo los top 4)
      employee: { name: '', schedule: '' }, // Datos del empleado actual (para crear o editar)
      employeeService: new EmployeeService(),
      createAndEditDialogIsVisible: false, // Controla la visibilidad del cuadro flotante
      isEdit: false, // Controla si estamos en modo edición
      submitted: false // Controla si el formulario fue enviado
    };
  },
  mounted() {
    this.loadEmployees(); // Cargar los empleados al montar el componente
  },
  methods: {
    // Cargar los empleados (top 4)
    loadEmployees() {
      this.employeeService.getAll().then((response) => {
        this.employees = response.data.slice(0, 4); // Solo obtener los primeros 4 empleados
      });
    },
    // Crear un nuevo empleado
    onNewEmployee() {
      this.employee = { name: '', schedule: '' }; // Reiniciar los datos del empleado
      this.isEdit = false; // Estamos en modo creación
      this.createAndEditDialogIsVisible = true; // Mostrar el cuadro flotante
    },
    // Editar un empleado
    onEditEmployee(employee) {
      this.employee = { ...employee }; // Copiar los datos del empleado seleccionado
      this.isEdit = true; // Estamos en modo edición
      this.createAndEditDialogIsVisible = true; // Mostrar el cuadro flotante
    },
    // Eliminar un empleado
    onDeleteEmployee(employee) {
      this.employeeService.delete(employee.id).then(() => {
        this.loadEmployees(); // Recargar los empleados después de eliminar
      });
    },
    // Guardar empleado (crear o actualizar)
    onSaveRequested(employee) {
      this.submitted = true;
      if (employee.name && employee.schedule) {
        if (this.isEdit) {
          // Actualizar empleado
          this.employeeService.update(employee.id, employee).then(() => {
            this.loadEmployees(); // Recargar los empleados después de actualizar
          });
        } else {
          // Crear nuevo empleado
          this.employeeService.create(employee).then(() => {
            this.loadEmployees(); // Recargar los empleados después de crear
          });
        }
        this.createAndEditDialogIsVisible = false; // Cerrar el cuadro flotante
      }
    },
    // Cancelar creación o edición
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false; // Cerrar el cuadro flotante
      this.submitted = false; // Reiniciar el estado de envío
      this.isEdit = false; // Reiniciar el modo edición
    }
  }
};
</script>

<template>
  <div class="top-employees">
    <h2 class="employees-title">Top Employees</h2>

    <!-- Mostrar la cuadrícula de empleados en un formato 2x2 -->
    <div class="employees-grid">
      <div v-for="employee in employees" :key="employee.id" class="employee-card">
        <span class="employee-name">{{ employee.name }}</span>
        <span class="employee-actions">
          <button @click="onEditEmployee(employee)">Edit</button>
          <button @click="onDeleteEmployee(employee)">Delete</button>
        </span>
      </div>
    </div>

    <!-- Botón para crear nuevo empleado -->
    <div class="actions">
      <button @click="onNewEmployee" class="btn-new-employee">New Employee</button>
    </div>

    <!-- Cuadro flotante para crear o editar empleado -->
    <create-and-edit
        :entity="employee"
        :visible="createAndEditDialogIsVisible"
        entity-name="Employee"
        :edit="isEdit"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested">
      <template #content>
        <div class="p-fluid">
          <div class="field mt-5">
            <pv-float-label>
              <label for="name">Name</label>
              <pv-input-text id="name" v-model="employee.name"
                             :class="{'p-invalid': submitted && !employee.name }"/>
            </pv-float-label>
          </div>

          <div class="field mt-5">
            <pv-float-label>
              <label for="schedule">Schedule</label>
              <pv-input-text id="schedule" v-model="employee.schedule"
                             :class="{'p-invalid': submitted && !employee.schedule }"/>
            </pv-float-label>
          </div>
        </div>
      </template>
    </create-and-edit>
  </div>
</template>

<style scoped>
.top-employees {
  display: flex;
  flex-direction: column;
}

.employees-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Distribuir en 2 columnas */
  gap: 20px;
  margin-top: 20px;
}

.employee-card {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
}

.employee-name {
  font-weight: bold;
}

.employee-actions {
  display: flex;
  gap: 10px;
}

.actions {
  margin-top: 20px;
}

.btn-new-employee {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-new-employee:hover {
  background-color: #0056b3;
}
</style>
