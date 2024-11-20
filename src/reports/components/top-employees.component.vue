<script>
import EmployeeService from "../services/employees.service.js";
import TopEmployeeService from "../services/top-employee.service.js";
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "top-employees",
  components: { CreateAndEdit },
  data() {
    return {
      employees: [], // Lista completa de empleados
      topEmployees: [], // Lista de empleados en "top employees"
      employee: { id: null, firstName: "", lastName: "" }, // Datos del empleado para crear/editar
      createAndEditDialogIsVisible: false, // Controla la visibilidad del cuadro flotante
      employeeSelectionDialogVisible: false, // Controla la visibilidad del cuadro flotante de selección
      isEdit: false, // Controla si estamos en modo edición
      submitted: false, // Controla si el formulario fue enviado
    };
  },
  mounted() {
    this.loadEmployees();
    this.loadTopEmployees();
  },
  methods: {
    // Carga a todos los empleados desde EmployeeService
    loadEmployees() {
      EmployeeService.getAll()
          .then((response) => {
            this.employees = response.data; // Guarda la lista de empleados completa
          })
          .catch((error) => {
            console.error("Error loading employees:", error);
          });
    },
    // Carga todos los empleados de "top employees"
    loadTopEmployees() {
      TopEmployeeService.getAll()
          .then((response) => {
            // Guarda solo los primeros 4 empleados
            this.topEmployees = response.data.slice(0, 4);
          })
          .catch((error) => {
            console.error("Error loading top employees:", error);
          });
    },
    // Mostrar el cuadro flotante para seleccionar un empleado
    onNewEmployee() {
      if (this.topEmployees.length >= 4) {
        alert("No puedes agregar más de 4 empleados a Top Employees.");
        return;
      }
      this.employeeSelectionDialogVisible = true; // Mostrar el cuadro flotante
    },
    // Agregar un empleado a "top employees"
    onSelectEmployee(employee) {
      if (!this.topEmployees.some((emp) => emp.id === employee.id)) {
        // Verificar si ya está en la lista
        if (this.topEmployees.length < 4) {
          const topEmployee = {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
          };
          TopEmployeeService.create(topEmployee)
              .then(() => {
                this.loadTopEmployees(); // Recargar los empleados
                this.employeeSelectionDialogVisible = false; // Cerrar el cuadro flotante
              })
              .catch((error) => {
                console.error("Error adding top employee:", error);
              });
        } else {
          alert("No puedes agregar más de 4 empleados a Top Employees.");
        }
      } else {
        alert("Este empleado ya está en la lista de Top Employees.");
      }
    },
    // Editar un empleado de "top employees"
    onEditEmployee(employee) {
      this.employee = { ...employee }; // Copiar los datos del empleado
      this.isEdit = true; // Modo edición
      this.createAndEditDialogIsVisible = true; // Mostrar el cuadro flotante
    },
    // Eliminar un empleado de "top employees"
    onDeleteEmployee(employee) {
      TopEmployeeService.delete(employee.id)
          .then(() => {
            this.loadTopEmployees(); // Recargar los empleados
          })
          .catch((error) => {
            console.error("Error deleting top employee:", error);
          });
    },
    // Guardar cambios en un empleado de "top employees"
    onSaveRequested(employee) {
      this.submitted = true;
      if (employee.firstName && employee.lastName) {
        // Verificar si es una creación o edición
        TopEmployeeService.update(employee.id, employee)
            .then(() => {
              this.loadTopEmployees(); // Recargar los empleados
              this.createAndEditDialogIsVisible = false; // Cierra el cuadro flotante
            })
            .catch((error) => {
              console.error("Error updating top employee:", error);
            });
      }
    },
    // Cancelar la creación o edición de un empleado
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false; // Cerrar el cuadro flotante
      this.submitted = false; // Reiniciar el estado de envío
      this.isEdit = false; // Reiniciar el modo edición
    },
  },
};
</script>

<template>
  <div class="top-employees">
    <h2 class="employees-title">Top Employees</h2>

    <!-- Tabla para mostrar los mejores empleados -->
    <table class="employees-table">
      <thead>
      <tr>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="employee in topEmployees" :key="employee.id">
        <td>{{ employee.id }}</td>
        <td>{{ employee.firstName }}</td>
        <td>{{ employee.lastName }}</td>
        <td>
          <button @click="onEditEmployee(employee)" class="btn-edit">
            Edit
          </button>
          <button @click="onDeleteEmployee(employee)" class="btn-delete">
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Botón para crear nuevo empleado -->
    <div class="actions">
      <button @click="onNewEmployee" class="btn-new-employee">
        New Employee
      </button>
    </div>

    <!-- Cuadro flotante para seleccionar empleado de la lista -->
    <pv-dialog v-model:visible="employeeSelectionDialogVisible" header="Select Employee" modal>
      <ul class="employee-selection-list">
        <li v-for="employee in employees" :key="employee.id">
          <button @click="onSelectEmployee(employee)">
            {{ employee.firstName }} {{ employee.lastName }}
          </button>
        </li>
      </ul>
    </pv-dialog>

    <!-- Cuadro flotante para editar empleado -->
    <create-and-edit
        :entity="employee"
        :visible="createAndEditDialogIsVisible"
        entity-name="Employee"
        :edit="isEdit"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested"
    >
      <template #content>
        <div class="p-fluid">
          <div class="field mt-5">
            <pv-float-label>
              <label for="firstName">First Name</label>
              <pv-input-text
                  id="firstName"
                  v-model="employee.firstName"
                  :class="{ 'p-invalid': submitted && !employee.firstName }"
              />
            </pv-float-label>
          </div>
          <div class="field mt-5">
            <pv-float-label>
              <label for="lastName">Last Name</label>
              <pv-input-text
                  id="lastName"
                  v-model="employee.lastName"
                  :class="{ 'p-invalid': submitted && !employee.lastName }"
              />
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

.employees-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.employees-table th,
.employees-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
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

.btn-edit {
  background-color: #28a745;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-edit:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}

.btn-delete:hover {
  background-color: #c82333;
}

.employee-selection-list button {
  background-color: transparent;
  color: #333;
  border: none;
  padding: 10px 15px;
  text-align: left;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.employee-selection-list button:hover {
  background-color: #f0f0f0;
  color: #000;
}
</style>
