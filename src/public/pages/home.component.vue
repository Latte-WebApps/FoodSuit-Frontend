<template>
  <div>
    <header>
      <h1>Home</h1>
    </header>

    <home-report />
  </div>
</template>

<script>
// Ruta relativa
import HomeReport from '../../reports/components/home-report.component.vue'; // Ruta relativa

export default {
  components: {
    HomeReport
  }
}
</script>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 10px;
}
</style>
