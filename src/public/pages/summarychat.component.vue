<template>
  <div>
    <h2>Today Summary</h2>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'SummaryChart',
  setup() {
    onMounted(() => {
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Current Year',
              backgroundColor: '#42A5F5',
              data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
              label: 'Previous Year',
              backgroundColor: '#9CCC65',
              data: [28, 48, 40, 19, 86, 27, 90]
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {beginAtZero: true},
            y: {beginAtZero: true}
          }
        }
      });
    });
  }
}
</script>

<style scoped>
/* Estilo para centrar el gráfico */
canvas {
  max-width: 600px;
  margin: 0 auto;
}
</style>
