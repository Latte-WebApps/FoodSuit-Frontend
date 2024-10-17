<script>
import { Report } from "../model/report.entity.js";
import { ReportService } from "../services/report.service.js";

export default {
  name: "report-datatable",
  data() {
    return {
      reports: [],
      reportService: null
    }
  },
  methods: {
    getRowType(data) {
      return data.type === 'income' ? 'income-row' : 'expense-row';
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

  <pv-data-table
      :value="reports"
      :rows="7"
      :row-class="getRowType"
      :paginator="true"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink">
    <pv-column field="description" style="min-width: 24rem;"/>
    <pv-column field="amount"  style="min-width: 12rem"/>
  </pv-data-table>
</template>

<style>
.income-row {
  background-color: #95f3a4 !important;
  color: #205b29 !important;
}
.expense-row {
  background-color: #fd736e !important;
  color: #000000 !important;
}
</style>

