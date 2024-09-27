<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import {Employee} from "../model/employee.entity.js";

export default {
  name: "employee-create-and-edit-dialog",
  computed: {
    Employee() {
      return Employee
    }
  },
  components: {CreateAndEdit},
  props: {
    employee: null,
    visible: Boolean
  },
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
    }
  }
}
</script>

<template>
  <create-and-edit
      :entity="Employee"
      :visible="visible"
      entity-name="Employee"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="Employee.name"
                           :class="{'p-invalid': submitted && !Employee.name }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>

</style>