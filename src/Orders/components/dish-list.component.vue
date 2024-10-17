<script>
import { Dish } from "../model/dish.entity.js";
import { DishService } from "../services/dish.service.js";


export default {
  name: "dish-list",
  data() {
    return {
      selectedDishes: []
    }
  },
  computed: {
    Dish() {
      return Dish
    }
  },
  methods: {
    updateSelectedDishes(dish) {
      this.selectedDishes.push(dish);
      this.saveSelectedDishes();
    },
    async saveSelectedDishes() {
      const dishService = new DishService();
      await dishService.saveSelectedDishes(this.selectedDishes);
    }
  },
  props: {
    dish: {
      type: Dish,
      required: true
    }
  }
}
</script>

<template>

  <div class="card flex justify-center">
    <Listbox v-model="selectedDishes" :options="dish.name" @change="updateSelectedDishes" multiple optionLabel="name" class="w-full md:w-56" />
  </div>

</template>

<style scoped>

</style>