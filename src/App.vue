<template>
  <div id="app">
    <header>
      <h1>Employees Schedule</h1>
    </header>
    <main>
      <!-- Include the ScheduleApp component -->
      <ScheduleApp />
      <pv-float-label/>
      <create-and-edit/>
      <main>
        <router-view/>
      </main>
    </main>
  </div>

</template>

<script>

import ScheduleApp from './schedules/components/schedule-component.vue'
import CreateAndEdit from "./shared/components/create-and-edit.component.vue";

export default {
  components: {
    CreateAndEdit,
    ScheduleApp
  }
};
</script>

<style>
/* Add any global styles here */
</style>
