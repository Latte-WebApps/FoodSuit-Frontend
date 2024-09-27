<template>
  <div>
    <div class="summary-section">
      <h3>Accounts</h3>
      <ul class="accounts">
        <li v-for="account in accounts" :key="account.table" :class="{ 'green': account.type === 'income', 'red': account.type === 'expense' }">
          {{ account.description }} - {{ account.amount | currency }}
        </li>
      </ul>
    </div>

    <div class="employees-section">
      <h3>Most Productive Employees</h3>
      <ul>
        <li v-for="employee in employees" :key="employee.id">{{ employee.name }}</li>
      </ul>
    </div>

    <div class="inventory-section">
      <h3>Most Scarce Products</h3>
      <div class="inventory-grid">
        <div v-for="item in inventory" :key="item.id" class="inventory-item">
          {{ item.name }} - {{ item.quantity }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeService from '../services/employees.service';
import InventoryService from '../services/inventory.service';

export default {
  data() {
    return {
      employees: [],
      inventory: [],
      accounts: [
        { description: 'Table 1', amount: 180, type: 'income' },
        { description: 'Table 4', amount: 110, type: 'income' },
        { description: 'Bought: 30 Tomatoes', amount: 30, type: 'expense' },
        { description: 'Table 3', amount: 78, type: 'income' },
        { description: 'Table 2', amount: 60, type: 'income' },
        { description: 'Bought: 20kg of meat', amount: 180, type: 'expense' },
        { description: 'Table 5', amount: 80, type: 'income' }
      ]
    };
  },
  mounted() {
    this.loadEmployees();
    this.loadInventory();
  },
  methods: {
    loadEmployees() {
      EmployeeService.getAll()
          .then(response => {
            this.employees = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    },
    loadInventory() {
      InventoryService.getAll()
          .then(response => {
            this.inventory = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
};
</script>

<style scoped>
.summary-section {
  margin-bottom: 20px;
}

.accounts {
  list-style: none;
  padding: 0;
}

.accounts li {
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  color: white;
}

.green {
  background-color: #b2fab4;
}

.red {
  background-color: #ffccd5;
}

.inventory-grid {
  display: flex;
  flex-wrap: wrap;
}

.inventory-item {
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>
