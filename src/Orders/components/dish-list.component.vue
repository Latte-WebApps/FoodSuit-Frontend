<script>
import { DishService } from "../services/dish.service.js";

export default {
  name: "dish-list",
  components: {},
  data() {
    return {
      dishes: [],
      selectedDishes: [],
      dishService: null,
      optionsVisible: false,
      dialogVisible: false,

      quantity: null,
      instruction: null,
      selectedDish: null,

    }
  },

  methods: {
    updateSelectedDishes(dish) {
      this.selectedDishes.push(dish);
      this.saveSelectedDishes();
    },
    async saveSelectedDishes() {
      const dishService = new DishService();
      await dishService.saveSelectedDishes(this.selectedDishes);
    },
    onDishChange() {
      this.dialogVisible = true;
      this.quantity = null;
      this.instruction = null;
    },

    onDataSave() {


        const dish = {
          id: this.selectedDish.id,
          quantity: this.quantity,
          instruction: this.instruction
        };
        this.selectedDishes.push(dish);
        this.$emit('update-selected-dishes', dish);
        this.selectedDish = null;
        this.optionsVisible = false;
        this.dialogVisible = false;
    },
  },

  props: {
    dishes: {
      type: Array,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="card">
    <pv-button class="pv-button" @click="optionsVisible = true">{{category}}</pv-button>
    <pv-dialog class="pv-dialog" v-model:visible="optionsVisible" maximizable modal header="Select an option" :style="{ width: '50rem' }">
      <div>
        <pv-list-box v-model="selectedDish" :options="dishes" optionLabel="name" class="pv-list-box" listStyle="max-height:500px" @change="onDishChange">
          <template #option="slotProps">
            <div class="flex-row">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </pv-list-box>
        <pv-dialog class="pv-dialog" v-model:visible="dialogVisible" modal header="Input details" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <pv-input-number class="pv-input-number" v-model="quantity" placeholder="Quantity"></pv-input-number>
          <pv-input-text class="pv-input-text" v-model="instruction" placeholder="Special Instructions"></pv-input-text>
          <pv-button @click="onDataSave">Done</pv-button>
        </pv-dialog>
      </div>
    </pv-dialog>
  </div>

</template>

<style scoped>

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}


.pv-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5rem 4rem;
  font-size: 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pv-button:hover {
  background-color: #0056b3;
}

.pv-dialog {
  width: 50rem;
}

.pv-list-box {
  width: 100%;
  max-height: 500px;
}

.pv-input-number,
.pv-input-text {
  width: 100%;
  margin-bottom: 1rem;
}

.pv-button:focus {
  outline: none;
}

</style>