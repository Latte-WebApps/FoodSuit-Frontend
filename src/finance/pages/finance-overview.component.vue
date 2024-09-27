<script>
import ReportTableComponent from "../components/report-table.component.vue";
import ReportPie from "../components/report-pie.component.vue";
export default {
  name: "finance-overview",
  components: {ReportPie, ReportTableComponent}
}
</script>

<template>
  <div class="flex flex-row gap-8">
    <report-pie/>
    <report-table-component/>
  </div>
</template>

<style scoped>

</style>