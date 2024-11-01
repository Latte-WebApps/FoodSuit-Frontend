<script>
export default {
  name: "report-pie",
  props: {
    reports: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
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
            backgroundColor: ["#aefaa6", "#f3666b"],
            hoverBackgroundColor: ["#aefaa6", "#f3666b"]
          }
        ]
      };
    }
  },
  watch: {
    reports: {
      handler() {
        this.chartData = this.setChartData();
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.chartData = this.setChartData();
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