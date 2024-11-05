<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import InventoryService from '../services/inventory.service';

export default {
  name: 'products-list',
  components: {
    'pv-data-table': DataTable,
    'pv-column': Column,
    'pv-tag': Tag
  },
  data() {
    return {
      inventory: [],
      sortField: 'quantity',
      sortOrder: 1,
    };
  },
  computed: {

    sortedInventory() {
      return [...this.inventory].sort((a, b) => {
        if (this.sortOrder === 1) return a.quantity - b.quantity; // Ascendente
        return b.quantity - a.quantity; // Descendente
      });
    },

    scarceInventory() {
      return [...this.inventory]
          .sort((a, b) => a.quantity - b.quantity)
          .slice(0, 4); // Toma los 4 primeros
    }
  },
  mounted() {
    this.loadInventory();
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
    // Devuelve el nivel de severidad según la cantidad
    getSeverity(quantity) {
      return quantity <= 7 ? 'danger' : 'success';
    }
  }
};
</script>

<template>
  <div class="product-list">
    <!-- Primera sección: Tabla de inventario -->
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

    <!-- Segunda sección: Productos más escasos -->
    <h3 class="scarce-title">Most Scarce Products</h3>
    <div class="scarce-products">
      <div v-for="product in scarceInventory" :key="product.id" class="scarce-product">
        <span class="product-name">{{ product.name }}</span>
        <span class="product-quantity">{{ product.quantity }}</span>
      </div>
    </div>
  </div>
</template>


<style>
.product-list {
  display: flex;
  flex-direction: column; /* Organiza los elementos verticalmente */
  width: 100%;
}

.scarce-products {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Distribuir en 2 columnas */
  gap: 20px;
  margin-top: 20px;
}

.scarce-product {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
}

.product-name {
  font-weight: bold;
}

.product-quantity {
  font-weight: bold;
}

.inventory-title, .scarce-title {
  margin-bottom: 10px;
}

/* Estilo para la tabla */
.pv-data-table {
  margin-bottom: 20px;
}

.pv-tag.success {
  background-color: #28a745; /* Verde */
}

.pv-tag.danger {
  background-color: #dc3545; /* Rojo */
}
</style>
