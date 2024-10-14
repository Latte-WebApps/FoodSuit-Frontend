<script>
import {Report} from "../model/report.entity.js";
import {ReportService} from "../services/report.service.js";
import TableManager from "../../shared/components/table-manager.component.vue";

export default {
  name: "report-table",
  components: {TableManager},
  data() {
    return {
      reports: [],
      reportService: null
    }
  },
  methods: {
    getRowClass(report) {
      return report.type === 'income' ? 'income-row' : 'expense-row';
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
  <div class="w-full">
    <table-manager v-bind:items="reports" >
      <template #custom-columns>
        <pv-column :sortable="true" field="description" header="Description" class="bg-gray-100"  style="min-width: 24rem"/>
        <pv-column :sortable="true" field="amount" header="Amount" style="min-width: 12rem"/>
      </template>
      <template #row="slotProps">
        <tr :class="getRowClass(slotProps.data)">
          <td>{{slotProps.data.description}}</td>
          <td>{{slotProps.data.amount}}</td>
        </tr>
      </template>
    </table-manager>
  </div>
</template>

<style scoped>
</style>