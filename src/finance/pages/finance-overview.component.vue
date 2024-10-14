<script>
import ReportPie from "../components/report-pie.component.vue";
import ReportDatatable from "../components/report-datatable.component.vue";
export default {
  name: "finance-overview",
  components: {ReportPie, ReportDatatable}
}
</script>

<template>
  <div class="flex flex-row gap-8">
    <div>
      <p>test1</p>
      <p>test2</p>
    </div>
    <div>
      <report-pie/>
      <report-datatable/>
    </div>

  </div>
</template>

<style scoped>

</style>