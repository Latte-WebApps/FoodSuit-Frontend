<script>
import {Report} from "../model/report.entity.js";
import {ReportService} from "../services/report.service.js";

export default {
  name: "report-pie",
  data() {
    return {
      reports: [],
      reportService: null,
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    setChartData() {
      const incomeSum = this.reports
          .filter(report => report.type === 'income')
          .reduce((sum, report ) => sum + report.amount, 0);
      const expenseSum = this.reports
          .filter(report => report.type === 'expense')
          .reduce((sum, report) => sum + report.amount, 0);
      return {
        labels: ['Incomes','Expenses'],
        datasets: [
          {
            data: [incomeSum, expenseSum],
            backgroundColor: [
              "#aefaa6",
              "#f3666b",
            ],
            hoverBackgroundColor: [
              "#aefaa6",
              "#f3666b",
            ]
          }
        ]
      };
    }
  },
  created() {
    this.reportService = new ReportService();
    this.reportService.getAll().then(response => {
      this.reports = response.data.map(report => new Report(report));
      this.chartData = this.setChartData();
    }).catch(e => console.error(e));

  }
}
</script>

<template>
  <div class="card flex justify-center h-23rem">
    <pv-chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]"/>
  </div>
</template>

<style scoped>

</style>