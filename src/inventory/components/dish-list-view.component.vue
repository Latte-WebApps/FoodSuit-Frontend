<script>
import {DishService} from "../../Orders/services/dish.service.js";
import {Dish} from "../../Orders/model/dish.entity.js";
import DishCreateDialog from "./dish-create-dialog.vue";

export default {
  name: "dish-list-view",
  components: {DishCreateDialog},
  data() {
    return {
      dishes: [],
      dishService: null,
      createDialogVisible: false
    }
  },
  created() {
    this.dishService = new DishService();
    this.dishService.getAll().then(response => {
      this.dishes = response.data;
    }).catch(e => console.error(e));
  },
  methods: {
    newDish() {
      this.createDialogVisible = true;
    },
    saveDish(dish) {
      this.dishService.createDish(dish).then(response => {
        this.dishes.push(response.data);
        this.createDialogVisible = false;
      }).catch(e => console.error(e));
    },
    cancelDialog() {
      this.createDialogVisible = false;
    },
    deleteThisDish(id) {
      this.dishService.deleteDish(id).then(() => {
        this.dishes = this.dishes.filter(dish => dish.id !== id);
      }).catch(e => console.error(e));
    }
  }
}
</script>

<template>
  <div class="card">
    <pv-data-view :value="dishes" paginator :rows="5">
      <!-- Slot for custom rendering -->
      <template #list="slotProps">
        <!-- Outer container for grid layout -->
        <div class="grid gap-4">
          <!-- Loop through items -->
          <div
              v-for="(item, index) in slotProps.items"
              :key="index"
              class="col-12 border-round bg-gray-300">
            <div class="grid bg-surface-100 text-center">
              <div class="p-1 col-4">
                <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">
                  {{ item.category }}
                </span>
                <div class="text-lg font-medium mt-2">{{ item.name }}</div>
              </div>
              <div class="col-4 text-xl font-semibold mt-2">S/.{{ item.price }}</div>
              <div class="mt-2 col-4">
                <pv-button icon="pi pi-trash" class="bg-white" @click="deleteThisDish(item.id)" outlined></pv-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </pv-data-view>
    <pv-button class="bg-blue-500 text-white border-none mt-4" @click="newDish">Add dish</pv-button>
    <dish-create-dialog
        :visible="createDialogVisible"
        @save-requested="saveDish"
        @cancel-requested="cancelDialog"/>
  </div>
</template>


<style scoped>

</style>