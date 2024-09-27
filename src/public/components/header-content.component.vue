<script>
export default {
  name: "header-content"
}
</script>

<template>
  <pv-toolbar class="header-profile">
    <template #start>
      <div class="flex items-center gap-2">
        <router-link to="/home">
          <pv-button text>FoodSuit</pv-button>
        </router-link>
      </div>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <pv-button icon="pi pi-user" severity="secondary" aria-label="User"/>
        <h3>Hello, User</h3>
        <pv-button icon="pi pi-sign-out" severity="secondary" text aria-label="Sign Out"/>
      </div>
    </template>
  </pv-toolbar>
</template>

<style scoped>
.header-profile {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #323d44;
}
</style>