<script>
import { Report } from "../model/report.entity.js";
import { ReportService } from "../services/report.service.js";
import ReportPie from "../components/report-pie.component.vue";
import ReportDatatable from "../components/report-datatable.component.vue";
export default {
  name: "finance-overview",
  components: {ReportPie, ReportDatatable},
  data() {
    return {
      reports: [],
      reportService: null
    }
  },
  created() {
    this.reportService = new ReportService();
    this.reportService.getAll().then(response => {
      this.reports = response.data.map(report => new Report(report));
    }).catch(e => console.error(e));
  }
}
</script>

<template>
  <div class="flex flex-row gap-8 mt-8 align-content-center justify-content-center">
    <div class="flex align-items-center">
      <report-datatable :reports="reports"/>
    </div>

    <div class="align-items-center">
      <report-pie :reports="reports"/>

    </div>

  </div>
</template>

<style scoped>

</style>