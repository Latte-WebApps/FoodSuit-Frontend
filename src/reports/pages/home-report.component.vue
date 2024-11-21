<template>
  <div class="home-report-grid">
    <div class="grid-item">
      <summary-chart></summary-chart>
    </div>
    <div class="grid-item product-list">
      <products-list></products-list>
    </div>
    <div class="grid-item">
      <top-employees></top-employees>
    </div>

  </div>
</template>

<script>
import ProductsList from "../components/products-list.component.vue";
import TopEmployees from "../components/top-employees.component.vue";
import SummaryChart from "../components/summary-chart.component.vue";

export default {
  name: "home-report",
  components: { SummaryChart, TopEmployees, ProductsList },
};
</script>

<style scoped>
.home-report-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columnas iguales */
  grid-template-rows: auto auto; /* 2 filas automáticas */
  grid-gap: 100px; /* Espacio entre los elementos */
  width: 100%;
}

.grid-item {
  padding: 20px;
}

.product-list {
  grid-row: span 2; /* ProductsList ocupa dos filas */
}
</style>
