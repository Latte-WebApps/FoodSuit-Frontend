<script>
import DishList from "../components/dish-list.component.vue";
import {DishService} from "../services/dish.service.js";
import {EmployeeService} from "../../schedules/services/employees-service.js";
import {Employee} from "../../schedules/model/employee-entity.js";



export default {
  name: "order-management",
  components: {DishList},

  props: {
    selectedDishes: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      dishService: new DishService(),
      selectedDishes: [],

      categories: ['starter', 'main', 'special', 'dessert', 'drink'], // Lista de categorías
      dishesByCategory: {},

      tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedTable: null,

      selectedEmployee: null,
      employees: [],

      orderOverview: false,
      viewOrders: false

    }
  },

  async created() {
    const dishService = new DishService();
    for (const category of this.categories) {
      const response = await dishService.getByCategory(category);
      this.dishesByCategory[category] = response.data;
    }

    this.employeeService = new EmployeeService();
    this.employeeService.getAll().then(response => {
      this.employees = response.data.map(employee => new Employee(employee));
      console.log(this.employees);
    }).catch(error => console.error(error));

  },

  methods: {
    updateSelectedDishes(dish) {
      const category = this.categories.find(cat => this.dishesByCategory[cat].some(d => d.id === dish.id));
      if (category) {
        this.selectedDishes.push({ ...dish, category });
        console.log('Updated selectedDishes:', this.selectedDishes);
      } else {
        console.error(`Category not found for dish id: ${dish.id}`);
        //this.$toast.add({ severity: 'error', summary: 'Error', detail: `Category not found for dish id: ${dish.id}` });
      }
    },
    calculateTotalPrice() {
      let total = 0;
      for (const selectedDish of this.selectedDishes) {
        const dishDetails = this.dishesByCategory[selectedDish.category]?.find(d => d.id === selectedDish.id);
        if (dishDetails) {
          total += dishDetails.price * selectedDish.quantity;
        } else {
          console.error(`Dish details not found for id: ${selectedDish.id} and category: ${selectedDish.category}`);
          // this.$toast.add({ severity: 'error', summary: 'Error', detail: `Dish details not found for id: ${selectedDish.id} and category: ${selectedDish.category}` });
        }
      }
      console.log('Calculated total price:', total);
      return total;
    },

    clearOrder() {
      this.selectedDishes = [];
      this.selectedTable = null;
      this.selectedEmployee = null;
      this.orderOverview = false;
    },

    async submitOrder() {

      if (!this.selectedTable) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No table selected', life: 3000 });
        return;
      }
      if (!this.selectedDishes.length) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No dishes selected', life: 3000 });
        return;
      }
      if (!this.selectedEmployee) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No employee selected', life: 3000 });
        return;
      }

      const totalPrice = this.calculateTotalPrice();
      const order = {
        date: new Date().toISOString().split('T')[0],
        table: this.selectedTable,
        dishes: this.selectedDishes,
        employee: this.selectedEmployee ? this.selectedEmployee.id : null,
        status: 'In progress',
        totalPrice: totalPrice
      };
      try {
        await this.dishService.create(order);
        //console.log('Order submitted successfully');
        this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Order submitted successfully', life: 3000 });
      } catch (error) {
        this.$toast.add({ severity: 'error', life: 3000, summary: 'Error', detail: `Error submitting order: ${error.message}`});
      }
      this.clearOrder();
      this.orderOverview = false;
    }
  }

}
</script>

<template>

  <div>
    <h1>Order</h1>
    <div class="cards">
    <div class="body" v-for="category in categories" :key="category">
      <dish-list :dishes="dishesByCategory[category]" :category="category" @update-selected-dishes="updateSelectedDishes"/>
    </div>
    </div>
    <div class="selectables">
    <pv-select v-model="selectedTable" :options="tables" placeholder="Select table" class="w-4 md:w-30"/>
    <pv-select v-model="selectedEmployee" :options="employees" optionLabel="name" placeholder="Select an employee" class="w-7 md:30"/>
    </div>

    <div class="buttons">
      <pv-button class="button h-3 w-2" @click="orderOverview = true">Submit order</pv-button>
      <pv-dialog v-model:visible="orderOverview" maximizable modal header="Order overview" :style="{ width: '50rem' }">
        <div>
          <p>Table: {{selectedTable}}</p>
          <p>Employee: {{selectedEmployee?.name}}</p>
          <div v-for="dish in selectedDishes" :key="dish.id">
            <p>{{dish.name}} x {{dish.quantity}}</p>
          </div>
          <p>Total price: {{calculateTotalPrice()}}</p>
          <pv-button class="button" severity="secondary" @click="clearOrder">Clear order</pv-button>
          <pv-button class="button" @click="submitOrder">Submit order</pv-button>
        </div>
        </pv-dialog>
      <pv-button class="button h-3 w-2" @click="viewOrders = true">View orders</pv-button>
      <pv-drawer title="Orders" v-model:visible="viewOrders" header="Orders" position="full">
        <p>Orders</p>
      </pv-drawer>

    </div>
  </div>
</template>

<style scoped>

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.selectables {
  display: flex;
  justify-content: space-between;
}

.buttons {
  margin: 3px;
  padding: 10px 14px;
  align-content: end;
  display: flex;
  flex-direction: row-reverse;
}
.button{
  margin: 3px;
}

</style>