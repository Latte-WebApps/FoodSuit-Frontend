<script>

export default {
  name: "header-content" ,
  data() {
    return {
      items: [
        {label: 'Home', to: '/home'},
        {label: 'Finance', to: '/finance'},
        {label: 'Inventory', to: '/inventory' },
        {label: 'Employee', to: '/employee'},
        {label: 'Attendance', to: '/attendance'},
        {label: 'Productivity', to: '/productivity'},
        {label: 'Orders', to: '/order'}
      ]
    }
  }
}
</script>

<template>
  <pv-toolbar class="w-full h-5rem fixed top-0 left-0 z-1 border-noround border-none" style="background-color: #323d44">
    <template #start>
      <div class="flex pl-6 items-center gap-2">
        <router-link to="/home">
          <pv-button text class="font-bold font-italic text-2xl text-white">FOOD<br>SUIT</pv-button>
        </router-link>
      </div>
    </template>
    <template #end>
      <div class="flex items-center gap-4 pr-5" style="color: white">
        <pv-button icon="pi pi-user" severity="secondary" aria-label="User"/>
        <p class="font-bold">Hello, User</p>
        <pv-button icon="pi pi-sign-out" severity="secondary" text aria-label="Sign Out"/>
      </div>
    </template>
  </pv-toolbar>

  <pv-toolbar class="w-full h-3rem fixed left-0 z-1 border-noround border-none" style="top: 80px; background-color: #b4c1c5;">
    <template #start>
      <router-link
          v-for="item in items"
          :key="item.label"
          v-slot="{navigate, href}"
          :to="item.to" custom>
        <div class="pl-8">
          <pv-button :href="href" class="p-button-text font-bold text-base p-2 text-50" @click="navigate">
            {{item.label}}
          </pv-button>
        </div>
      </router-link>
    </template>
  </pv-toolbar>
</template>


<style scoped>

</style>
