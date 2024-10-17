<script>
import DishList from "../components/dish-list.component.vue";
import {DishService} from "../services/dish.service.js";

export default {
  name: "order-management",
  components: {DishList},

  data() {
    return {
      dish: []
    }
  },
  async created() {
    const dishService = new DishService();
    this.dish = await dishService.getAll();
  }

}
</script>

<template>
  <div>
    <h1> Order </h1>
    <dish-list :dish="dish"/>
  </div>
</template>

<style scoped>

</style>