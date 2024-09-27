<template>
  <div id="app">
    <header>
      <h1>Employees Schedule</h1>
    </header>
    <main>
      <header-content/>
      <create-and-edit/>
      <ScheduleApp />
      <pv-float-label/>
      <main>
        <router-view/>
      </main>
    </main>
  </div>

</template>

<script>

import ScheduleApp from './schedules/components/schedule-component.vue'
import CreateAndEdit from "./shared/components/create-and-edit.component.vue";
import HeaderContent from "./public/header-content.component.vue";

export default {
  name: 'app',
  title: 'FoodSuit',
  components: {
    HeaderContent,
    CreateAndEdit,
    ScheduleApp

  }
};
</script>

<style>
/* Add any global styles here */
</style>