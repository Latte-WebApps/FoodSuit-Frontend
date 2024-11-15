<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "stock-edit-dialog",
  components: {CreateAndEdit},
  props: {
    item: {
      type: Object,
      required: true
    },
    visible: Boolean,
    isIncrease: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      quantityChange: 0,
      submitted: false
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      if (this.quantityChange > 0) {
        const change = this.isIncrease ? this.quantityChange : -this.quantityChange;

        // Validar que la cantidad a restar no exceda el stock actual
        if (!this.isIncrease && this.quantityChange > this.item.quantity) {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Quantity to decrease exceeds current stock',
            life: 3000
          });
          this.$emit('cancel-requested');
        } else {
          this.$emit('save-requested', { ...this.item, quantityChange: change });
        }
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'La cantidad debe ser mayor que 0',
          life: 3000
        });
      }
    }




  }
}
</script>

<template>
  <create-and-edit
      :entity="item"
      :visible="visible"
      entity-name="Stock"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <pv-float-label>
          <pv-input-number id="quantityChange" v-model="quantityChange"
                           :class="{'p-invalid': submitted && quantityChange <= 0}"
                           :min="1" />
        </pv-float-label>
      </div>
    </template>
  </create-and-edit>
</template>



<style scoped>

</style>