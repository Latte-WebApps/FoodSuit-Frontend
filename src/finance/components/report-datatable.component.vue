<script>
export default {
  name: "report-datatable",
  props: {
    reports: {
      type: Array,
      required: true
    }
  },
  methods: {
    getRowType(data) {
      return data.reportType === 'Income' ? 'income-row' : 'expense-row';
    }
  }
}
</script>

<template>

  <pv-data-table
      :value="reports"
      :rows="8"
      :row-class="getRowType"
      :paginator="true"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink">
    <pv-column field="description" style="min-width: 24rem;"/>
    <pv-column field="amount"  style="min-width: 6rem">
      <template #body="slotProps">
          S/. {{ slotProps.data.amount }}
      </template>
    </pv-column>
    <pv-column field="date" style="min-width: 12rem"/>
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

