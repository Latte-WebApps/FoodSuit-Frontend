<script>
import { Report } from "../model/report.entity.js";
import { ReportService } from "../services/report.service.js";
import ReportPie from "../components/report-pie.component.vue";
import ReportDatatable from "../components/report-datatable.component.vue";
import DateFilter from "../components/date-filter.component.vue";
export default {
  name: "finance-overview",
  components: {ReportPie, ReportDatatable, DateFilter},
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
  <div class="flex flex-row gap-8">
    <div>
      <date-filter/>
      <div class="flex flex-row lg:gap-8 justify-content-center">

        <pv-card class="p-3 w-9rem">
          <template #header>
            <p>Most ordered dish</p>
            <img src="https://comedera.com/wp-content/uploads/sites/9/2022/03/Tacu-tacu-shutterstock_1604013508.jpg" alt="Most trending dish" width="120px"/>
          </template>
          <template #title>Tacu tacu</template>
        </pv-card>
        <pv-card class="p-3 w-9rem">
          <template #header>
            <p>Least ordered dish</p>
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FgAydtOLW2F8%2Fmaxresdefault.jpg" alt="Least trending dish" width="120px"/>
          </template>
          <template #title>Saltado de coliflor</template>
        </pv-card>
      </div>
    </div>
    <div>
      <report-pie :reports="reports"/>
      <report-datatable :reports="reports"/>
    </div>

  </div>
</template>

<style scoped>

</style>