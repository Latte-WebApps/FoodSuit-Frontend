<script>
import { Dish } from "../../Orders/model/dish.entity.js";

export default {
  name: "dish-create-dialog",
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dish: new Dish({}),
      submitted: false,
      categories: ['starter','main','special','dessert','drink']
    };
  },
  methods: {
    saveDish() {
      this.submitted = true;
      this.$emit('save-requested', this.dish);
    },
    cancel() {
      this.$emit('cancel-requested');
    }
  }
}
</script>

<template>
  <pv-dialog :visible="visible" modal header="Add New Dish" @hide="cancel">
    <div class="p-fluid">
      <div class="mb-2">
        <label for="name">Name</label>
        <pv-input-text id="name" v-model="dish.name" type="text" class="ml-2"/>
      </div>
      <div class="mb-2">
        <label for="category">Category</label>
        <pv-select id="category" v-model="dish.category" :options="categories" class="ml-2"/>
      </div>
      <div class="mb-2">
        <label for="price">Price</label>
        <pv-input-text id="price" v-model="dish.price" type="number" class="ml-2"/>
      </div>
    </div>
    <template #footer>
      <pv-button label="Cancel" icon="pi pi-times" class="bg-red-500 border-none" @click="cancel" />
      <pv-button label="Save" icon="pi pi-check" class="bg-blue-500 border-none" @click="saveDish" />
    </template>
  </pv-dialog>
</template>

<style scoped>

</style>