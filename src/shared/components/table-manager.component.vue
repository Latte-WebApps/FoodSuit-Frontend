<script>
export default {
  name: "table-manager",
  inheritAttrs: false,
  props: {
    items: { type: Array, required: true },
    dynamic: { type: Boolean, default: false },
    columns: { type: Array, default: () => [] }
  }
}
</script>

<template>
  <!-- Data Table -->
  <pv-datatable
      ref='dt'
      :paginator="true"
      :rows="7"
      :value="items"
      dataKey="id"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink">
    <slot name="custom-columns"></slot>
    <pv-column v-if="dynamic" v-for="column in columns" :key="column.field"
               :field="column.field"
               :header="column.header"/>
  </pv-datatable>
</template>

<style scoped>

</style>