<script>
import DishList from "../components/dish-list.component.vue";
import {DishService} from "../services/dish.service.js";


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
      /*dish: [],*/
      dishService: new DishService(),
      selectedDishes: [],

      categories: ['starter', 'main', 'special', 'dessert', 'drink'], // Lista de categorías
      dishesByCategory: {}
    }
  },

  async created() {
    const dishService = new DishService();
    for (const category of this.categories) {
      const response = await dishService.getByCategory(category);
      this.dishesByCategory[category] = response.data;
    }
  },

  methods: {
    updateSelectedDishes(dish) {
      this.selectedDishes.push(dish);
    },
    async submitOrder() {
      const order = {
        date: new Date().toISOString().split('T')[0],
        table: 1, // You can change this as needed
        dishes: this.selectedDishes
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
    <div class="body" v-for="category in categories" :key="category">
      <dish-list :dishes="dishesByCategory[category]" :category="category" @update-selected-dishes="updateSelectedDishes"/>
    </div>

    <pv-button @click="submitOrder">Submit order</pv-button>
  </div>
</template>

<style scoped>

</style>