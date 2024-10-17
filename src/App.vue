<script>
import HeaderContent from "./public/components/header-content.component.vue";

export default {
  name: 'app',
  title: 'FoodSuit',
  components: {HeaderContent},
}
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header>
    <header-content/>
  </header>
  <main class="pt-8">
    <router-view/>
  </main>
</template>

<style>

</style>