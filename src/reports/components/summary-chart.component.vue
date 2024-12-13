<template>
  <div class="summary-chart">
    <h2 class="summary-title">Monthly Summary</h2>
    <canvas id="summaryChart"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";
import { ReportService } from "../../finance/services/report.service.js";

export default {
  name: "summary-chart",
  data() {
    return {
      reportService: null, // Instancia del servicio
      reports: [], // Lista de reportes
      chart: null, // Instancia del gráfico
    };
  },
  created() {
    // Inicializar el servicio
    this.reportService = new ReportService();

    // Cargar los reportes al crearse el componente
    this.reportService
        .getAll()
        .then((response) => {
          this.reports = response.data;
          this.renderChart(); // Renderizar el gráfico con los datos obtenidos
        })
        .catch((error) => {
          console.error("Error loading reports:", error);
        });
  },
  methods: {
    getMonthlyData() {
      const incomeData = {};
      const expenseData = {};
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Procesar los datos para generar las estadísticas mensuales
      this.reports.forEach((report) => {
        const reportDate = new Date(report.date);
        const month = months[reportDate.getMonth()];
        if (report.reportType === "Income") {
          incomeData[month] = (incomeData[month] || 0) + report.amount;
        } else if (report.reportType === "Expense") {
          expenseData[month] = (expenseData[month] || 0) + report.amount;
        }
      });

      return { incomeData, expenseData };
    },

    renderChart() {
      const { incomeData, expenseData } = this.getMonthlyData();
      const months = Object.keys(incomeData).length > 0 ? Object.keys(incomeData) : Object.keys(expenseData);
      const incomeValues = months.map((month) => incomeData[month] || 0);
      const expenseValues = months.map((month) => expenseData[month] || 0);

      const ctx = document.getElementById("summaryChart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: months,
          datasets: [
            {
              label: "Income",
              data: incomeValues,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Expenses",
              data: expenseValues,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.summary-chart {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}
</style>
