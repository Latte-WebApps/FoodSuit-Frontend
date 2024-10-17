<script>
export default {
  name: "date-filter",
  data() {
    return {
      date: new Date()
    }
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <pv-date-picker v-model="date" inline showWeek/>
  </div>
</template>

<style scoped>

</style>