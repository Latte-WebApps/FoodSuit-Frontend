<script>
import HeaderContent from "./public/components/header-content.component.vue";

export default {
  name: 'app',
  title: 'FoodSuit',
  components: {HeaderContent},
  data() {
    return {
      items: [
        {label: 'Home', to: '/home'},
        {label: 'Finance', to: '/finance'},
        {label: 'Inventory', to: '/inventory' },
        {label: 'Employee', to: '/employee'}
      ]
    }
  }
}
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header-content/>
  <pv-toolbar class="sections">
    <template #start>
      <div class="flex-column">
        <router-link v-for="item in items"
                     :key="item.label"
                     v-slot="{navigate, href}"
                     :to="item.to" custom>
          <pv-button :href="href" class="p-button-text"
                     @click="navigate">
            {{item.label}}
          </pv-button>
        </router-link>
      </div>
    </template>
  </pv-toolbar>
  <main>
    <router-view/>
  </main>
</template>

<style scoped>
.sections {
  width: 100%;
  position: fixed;
  top: 85px;
  left: 0;
  z-index: 1000;
  background-color: #7f939a;
}
</style>