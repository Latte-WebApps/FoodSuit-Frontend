
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
        <!-- Columna para el nombre del producto -->
        <pv-column field="name" header="Product" sortable></pv-column>

        <!-- Columna para la cantidad con colores condicionales -->
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
      <h3>Most Productive Employees</h3>
      <ul>
        <li v-for="employee in employees" :key="employee.id">{{ employee.name }}</li>
      </ul>
    </div>

    <!-- Cuarta sección: Most Scarce Products -->
    <div class="most-scarce">
      <h3>Most Scarce Products</h3>
      <ul>
        <li v-for="item in scarceInventory" :key="item.id">{{ item.name }} - {{ item.quantity }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import InventoryService from '../services/inventory.service';
import EmployeeService from '../services/employees.service';

export default {
  components: {
    'pv-data-table': DataTable,
    'pv-column': Column,
    'pv-tag': Tag
  },
  data() {
    return {
      inventory: [], // Inventario completo
      employees: [], // Lista de empleados
      sortField: 'quantity', // Campo por defecto para ordenar
      sortOrder: -1 // Orden descendente (-1 para descendente, 1 para ascendente)
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
    loadEmployees() {
      EmployeeService.getAll()
          .then(response => {
            this.employees = response.data;
          })
          .catch(error => {
            console.error('Error loading employees:', error);
          });
    },
    getSeverity(quantity) {
      return quantity > 7 ? 'success' : 'danger';
    }
  }
};
</script>

<style >

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columnas iguales */
  grid-template-rows: repeat(2, 1fr);    /* 2 filas iguales */
  grid-gap: 20px;

  /* Ocupa toda la altura de la pantalla */
  width: 100%;   /* Asegura que no haya desplazamiento horizontal */
  box-sizing: border-box;
}

/* Sección de contenido */
.top-section, .inventory-status, .most-productive, .most-scarce {
  padding: 20px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

}

.inventory-status .inventory-title {
  margin-bottom: 10px; /* Espacio para el título */
}

/* Haciendo que sea responsive para pantallas más pequeñas */
@media (max-width: 800px) {
  .dashboard-grid {
    grid-template-columns: 1fr; /* 1 columna para pantallas pequeñas */
    grid-template-rows: auto;
    height: auto; /* Deja que la altura se ajuste automáticamente en pantallas pequeñas */
  }
}
</style>

