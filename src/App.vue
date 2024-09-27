<script setup>
import HeaderContent from "./public/components/header-content.component.vue";

export default {
  name: 'app',
  title: 'FoodSuit',
  data() {
    return {
      items: [
        {label: 'Home', to: '/home'},
        {label: 'Finance', to: '/finance'},
        {label: 'Employees', to: '/employees'},
        {label: 'Inventory', to: '/inventory'},
      ]
    }
  }
}
</script>

<template>
  <pv-toast/>
  <header-content/>
  <main>
    <router-view/>
  </main>
</template>

<style scoped>

</style>
