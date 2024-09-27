<template>
  <div class="dashboard-grid">
    <!-- Primera sección: Gráfico -->
    <div class="top-section">
      <h2 class="summary-title">Today Summary</h2>
      <!-- Aquí puedes agregar tu componente de gráfico más adelante -->
    </div>

    <!-- Segunda sección: Inventory Status -->
    <div class="inventory-status">
      <h2 class="inventory-title">Inventory Status</h2>
      <pv-data-table :value="sortedInventory" scrollable scrollHeight="400px" responsiveLayout="scroll" :sortField="sortField" :sortOrder="sortOrder">
        <pv-column field="name" header="Product" sortable></pv-column>
        <pv-column field="quantity" header="Quantity" sortable>
          <template #body="slotProps">
            <pv-tag :severity="getSeverity(slotProps.data.quantity)">
              {{ slotProps.data.quantity }}
            </pv-tag>
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <!-- Tercera sección: Most Productive Employees -->
    <div class="most-productive">
      <div v-for="employee in employees" :key="employee.id" class="employee-card">
        <span>{{ employee.name }}</span>
        <div class="employee-actions">
          <button @click="openReplaceDialog(employee.id)" class="replace-button">Replace</button>
          <button @click="deleteEmployee(employee.id)" class="delete-button">Delete</button>
        </div>
      </div>
    </div>

    <!-- Replace Employee Dialog -->
    <pv-dialog v-model:visible="replaceDialogVisible" modal>
      <h3>Replace Employee</h3>
      <p>Select a new employee:</p>
      <ul>
        <li v-for="emp in allEmployees" :key="emp.id">
          <button @click="replaceEmployee(emp.id)">{{ emp.name }}</button>
        </li>
      </ul>
      <button @click="replaceDialogVisible = false">Cancel</button>
    </pv-dialog>

    <!-- Cuarta sección: Most Scarce Products -->
    <div class="most-scarce">
      <h3>Most Scarce Products</h3>
      <div class="product-card" v-for="item in scarceInventory" :key="item.id">
        <span>{{ item.name }}</span>
        <span>{{ item.quantity }}</span>
      </div>
    </div>
  </div>
</template>


<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import InventoryService from '../services/inventory.service';
import EmployeeService from '../services/employees.service';
import Dialog from 'primevue/dialog';

export default {
  components: {
    'pv-data-table': DataTable,
    'pv-column': Column,
    'pv-tag': Tag,
    'pv-dialog': Dialog
  },
  data() {
    return {
      inventory: [], // Inventario completo
      employees: [], // Lista de empleados
      allEmployees: [], // Todos los empleados para reemplazo
      replaceDialogVisible: false, // Controla la visibilidad del diálogo
      sortField: 'quantity',
      sortOrder: -1,
      selectedEmployeeId: null // Empleado seleccionado para reemplazo
    };
  },
  computed: {
    sortedInventory() {
      return this.inventory;
    },
    scarceInventory() {
      return this.inventory.filter(item => item.quantity <= 7);
    }
  },
  mounted() {
    this.loadInventory();
    this.loadEmployees();
  },
  methods: {
    loadInventory() {
      InventoryService.getAll()
          .then(response => {
            this.inventory = response.data;
          })
          .catch(error => {
            console.error('Error loading inventory:', error);
          });
    },
    getSeverity(quantity) {
      return quantity > 7 ? 'success' : 'danger';
    },
    loadEmployees() {
      EmployeeService.getAll()
          .then((response) => {
            this.employees = response.data.slice(0, 4); // Muestra los primeros 4 empleados
            this.allEmployees = response.data; // Todos los empleados para el reemplazo
          })
          .catch((error) => {
            console.error('Error loading employees:', error);
          });
    },
    openReplaceDialog(employeeId) {
      this.selectedEmployeeId = employeeId; // Guardar ID del empleado a reemplazar
      this.replaceDialogVisible = true; // Mostrar el diálogo
    },
    replaceEmployee(newEmployeeId) {
      const newEmployee = this.allEmployees.find(emp => emp.id === newEmployeeId);
      if (newEmployee) {
        this.employees = this.employees.map(emp =>
            emp.id === this.selectedEmployeeId ? newEmployee : emp
        );
      }
      this.replaceDialogVisible = false; // Cerrar el diálogo después de reemplazar
    },
    deleteEmployee(employeeId) {
      this.employees = this.employees.filter(employee => employee.id !== employeeId);
    }
  }
};
</script>


<style>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columnas iguales */
  grid-template-rows: repeat(2, 1fr);    /* 2 filas iguales */
  grid-gap: 20px;
  width: 100%;   /* Asegura que no haya desplazamiento horizontal */

  box-sizing: border-box;
}

/* Sección de contenido */
.top-section, .inventory-status, .most-productive, .most-scarce {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 100px;
}

/* Estilo para los empleados en grid */
.most-productive {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Grid 2x2 */
  grid-gap: 20px;
  justify-items: center;
}

.employee-card {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  width: 200px;
  text-align: center;
}
.most-scarce {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Grid 2x2 */
  grid-gap: 20px;
  justify-items: center;
}

.product-card {
  background-color: #f5f5f5; /* Fondo gris claro */
  padding: 10px;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.product-card span {
  font-weight: bold; /* Negrita para dar énfasis */
}
.employee-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.replace-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.replace-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}

.p-dialog {
  width: 300px !important;
}

/* Haciendo que sea responsive para pantallas más pequeñas */
@media (max-width: 800px) {
  .dashboard-grid {
    grid-template-columns: 1fr; /* 1 columna para pantallas pequeñas */
    grid-template-rows: auto;
  }
}
</style>






