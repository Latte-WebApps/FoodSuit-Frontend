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
            <label for="firstName">First Name</label>
            <pv-input-text id="firstName" v-model="employee.firstName"
                           :class="{'p-invalid': submitted && !employee.firstName }"/>
          </pv-float-label>
          <pv-float-label>
            <label for="lastName">Last Name</label>
            <pv-input-text id="lastName" v-model="employee.lastName"
                           :class="{'p-invalid': submitted && !employee.lastName }"/>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <label for="schedule">Entry Time</label>
            <pv-input-text id="schedule" v-model="employee.entryTime"
                           :class="{'p-invalid': submitted && !employee.entryTime }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="schedule">Exit Time</label>
            <pv-input-text id="schedule" v-model="employee.exitTime"
                           :class="{'p-invalid': submitted && !employee.exitTime }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>

</style>