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
    visible: Boolean
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
        this.$emit('save-requested', { ...this.item, quantityChange: this.quantityChange });
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
          <small v-if="submitted && quantityChange <= 0" class="p-error">La cantidad debe ser mayor que 0</small>
        </pv-float-label>
      </div>
    </template>
  </create-and-edit>
</template>



<style scoped>

</style>