<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "employee-create-and-edit-dialog",
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
      if (this.employee.name && this.employee.schedule) {
        this.$emit('save-requested', this.employee);
      }
    }
  }
}
</script>

<template>
  <create-and-edit
      :entity="employee"
      :visible="visible"
      entity-name="Employee"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="employee.name"
                           :class="{'p-invalid': submitted && !employee.name }"/>
          </pv-float-label>
        </div>

        <div class="field mt-5">
        <pv-float-label>
            <label for="schedule">Schedule</label>
            <pv-input-text id="schedule" v-model="employee.schedule"
                           :class="{'p-invalid': submitted && !employee.schedule }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>

</style>