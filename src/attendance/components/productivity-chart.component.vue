<template>
  <div>
    <h2>Employee Productivity Chart</h2>
    <div v-if="message">{{ message }}</div>
    <div v-else class="w-auto">
      <pv-chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
    </div>
  </div>
</template>

<script>
import ProductivityService from "../services/productivity.service.js"; // Ajusta la ruta según sea necesario

export default {
  name: "productivity-chart",

  data() {
    return {
      productivityData: [], // Datos de productividad
      message: '', // Mensaje para datos insuficientes
      chartData: null,
      chartOptions: null
    };
  },
  mounted() {
    this.loadProductivityData(); // Cargar datos al montar el componente
  },
  watch: {
    productivityData: {
      handler() {
        this.setChartData(); // Actualiza los datos del gráfico al cambiar la entrada
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async loadProductivityData() {
      try {
        const response = await ProductivityService.getProductivity();
        if (response.data.length === 0) {
          this.message = 'No hay suficientes datos para generar gráficos.';
          return;
        }
        this.productivityData = response.data; // Asignar datos al estado
      } catch (error) {
        console.error('Error al cargar los datos de productividad:', error);
        this.message = 'Error al cargar los datos de productividad.';
      }
    },
    // Genera un color aleatorio en formato hexadecimal
    generateRandomColor() {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor}`;
    },
    setChartData() {
      const labels = this.productivityData[0]?.months || []; // Obtener los meses
      const datasets = this.productivityData.map(item => ({
        label: item.employeeName,
        fill: false,
        borderColor: this.generateRandomColor(), // Asignar color aleatorio
        tension: 0.4,
        data: item.hoursWorked
      }));

      this.chartData = {
        labels,
        datasets
      };
    },
    setChartOptions() {
      this.chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Meses'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Horas Trabajadas'
            }
          }
        }
      };
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.card {
  padding: 1rem;
  margin-top: 20px;
}
</style>
