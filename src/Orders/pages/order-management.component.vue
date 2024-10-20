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
        }
      }
      console.log('Calculated total price:', total);
      return total;
    },
    async submitOrder() {
      const totalPrice = this.calculateTotalPrice();
      const order = {
        date: new Date().toISOString().split('T')[0],
        table: this.selectedTable,
        dishes: this.selectedDishes,
        employee: this.selectedEmployee ? this.selectedEmployee.id : null,
        totalPrice: totalPrice
      };
      try {
        await this.dishService.create(order);
        console.log('Order submitted successfully');
      } catch (error) {
        console.error('Error submitting order:', error);
      }
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
    <pv-button class="h-3 w-2" @click="submitOrder">Submit order</pv-button>
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

</style>