<script>
import ProductsList from "../components/products-list.component.vue";
import TopEmployees from "../components/top-employees.component.vue";

export default {
name: "home-report",
  components: {TopEmployees, ProductsList}
}
</script>

<template>
  <top-employees></top-employees>
  <products-list></products-list>
</template>

<style scoped>

</style>