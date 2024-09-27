<script>
import ReportTableComponent from "../components/report-table.component.vue";
import ReportPie from "../components/report-pie.component.vue";
import DateFilterComponent from "../components/date-filter.component.vue";
export default {
  name: "finance-overview",
  components: {ReportPie, ReportTableComponent, DateFilterComponent},
}
</script>

<template>
  <div class="flex flex-row lg:gap-8">
    <div>
      <date-filter-component/>
      <div class="flex flex-row lg:gap-8 justify-content-center">
        <pv-card >
          <template #header>
            <img alt="Most trending dish"/>
          </template>
          <template #title>Plato 1</template>
        </pv-card>
        <pv-card>
          <template #header>
            <img alt="Least trending dish"/>
          </template>
          <template #title>Plato 2</template>
        </pv-card>
      </div>
    </div>
    <div>
      <h1>Flow overview</h1>
      <report-pie/>
      <report-table-component/>
    </div>
  </div>
</template>

<style scoped>

</style>