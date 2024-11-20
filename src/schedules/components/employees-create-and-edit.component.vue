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
      @save-requested="onSaveRequested"
  >
    <template #content>
      <div class="dialog-container">
        <div class="field">
          <pv-float-label>
            <label for="firstName">First Name</label>
            <pv-input-text
                id="firstName"
                v-model="employee.firstName"
                class="input-field"
                :class="{'p-invalid': submitted && !employee.firstName}"
            />
          </pv-float-label>
        </div>

        <div class="field">
          <pv-float-label>
            <label for="lastName">Last Name</label>
            <pv-input-text
                id="lastName"
                v-model="employee.lastName"
                class="input-field"
                :class="{'p-invalid': submitted && !employee.lastName}"
            />
          </pv-float-label>
        </div>

        <div class="field">
          <pv-float-label>
            <label for="entryTime">Entry Time</label>
            <pv-input-text
                id="entryTime"
                v-model="employee.entryTime"
                class="input-field"
                :class="{'p-invalid': submitted && !employee.entryTime}"
            />
          </pv-float-label>
        </div>

        <div class="field">
          <pv-float-label>
            <label for="exitTime">Exit Time</label>
            <pv-input-text
                id="exitTime"
                v-model="employee.exitTime"
                class="input-field"
                :class="{'p-invalid': submitted && !employee.exitTime}"
            />
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
.dialog-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.p-invalid {
  border: 1px solid red;
}

.p-fluid {
  display: flex;
  flex-direction: column;
}
</style>