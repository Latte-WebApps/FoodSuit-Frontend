<script>
import {Employee} from "../model/employee-entity.js";
import {EmployeeService} from "../services/employees-service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import EmployeeCreateAndEdit from "../components/employees-create-and-edit.component.vue";
import EmployeeCreateAndEditDialog from "../components/employees-create-and-edit.component.vue";

export default {
  name: "employee",
  components: {EmployeeCreateAndEditDialog, EmployeeCreateAndEdit, DataManager},
  data() {
    return {
      title: {singular: "Employee", plural: "Employees"},
      employees: [],
      employee: new Employee({}),
      selectedEmployees: [],
      employeeService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false
    }
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 700});
    },
    findIndexById(id) {
      return this.employees.findIndex(employee => employee.id === id);
    },

    onNewEmployee() {
      this.employee = new Employee({});
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },
    onEditEmployee(employee) {
      console.log('Edit button clicked', employee);
      this.employee = new Employee(employee);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteEmployee(employee) {
      this.employee = new Employee(employee);
      this.deleteEmployee();
    },
    onDeleteSelectedEmployees(selectedEmployees) {
      this.selectedEmployees = selectedEmployees;
      this.deleteSelectedEmployees();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(employee) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (this.employee.name.trim()) {
        if (employee.id) {
          this.updateEmployee();
        } else
        {
          this.createEmployee();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    createEmployee() {
      this.employeeService.create(this.employee).then(response => {
        let employee = new Employee(response.data);
        this.employees.push(employee);
        this.notifySuccessfulAction("Employee created successfully");
      }).catch(error => console.error(error));
    },
    updateEmployee() {
      this.employeeService.update(this.employee.id, this.employee).then(response => {
        console.log('updateEmployee');
        let index = this.findIndexById(this.employee.id);
        this.employees[index] = new Employee(response.data);
        console.log(this.employees);
        this.notifySuccessfulAction("Employee updated successfully");
      }).catch(error => console.error(error));
    },
    deleteEmployee() {
      this.employeeService.delete(this.employee.id).then(() => {
        let index = this.findIndexById(this.employee.id);
        this.employees.splice(index, 1);
        this.notifySuccessfulAction("Employee deleted successfully");
      }).catch(error => console.error(error));
    },
    deleteSelectedEmployees() {
      this.selectedEmployees.forEach((employee) => {
        this.employeeService.delete(employee.id).then(() => {
          this.employees = this.employees.filter((c) => c.id !== employee.id);
        });
      });
      this.notifySuccessfulAction("Selected Employees Schedules deleted successfully");
    }
  },
  created() {
    this.employeeService = new EmployeeService();
    this.employeeService.getAll().then(response => {
      this.employees = response.data.map(employee => new Employee(employee));
      console.log(this.employees);
    }).catch(error => console.error(error));
  }

}
</script>

<template>
  <div class="w-full mt-8">
    <data-manager :title="title"
                  v-bind:items="employees"
                  v-on:new-item-requested="onNewEmployee"
                  v-on:edit-item-requested="onEditEmployee($event)"
                  v-on:delete-item-requested="onDeleteEmployee($event)"
                  v-on:delete-selected-items-requested="onDeleteSelectedEmployees($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 12rem"/>
        <pv-column field="image" header="Image" style="width: 10rem">
          <template #body="slotProps">
            <img :src="slotProps.data.image" alt="Employee Image" style="width: 100%; height: auto; border-radius: 4px;" />
          </template>
        </pv-column>
        <pv-column :sortable="true" field="name" header="Name" style="min-width: 24rem"/>
        <pv-column :sortable="true" field="schedule" header="Schedule" style="min-width: 12rem"/>
      </template>
    </data-manager>
    <employee-create-and-edit-dialog
        :edit="isEdit"
        :employee="employee"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested="onCancelRequested"
        v-on:save-requested="onSaveRequested($event)"/>
  </div>
</template>

<style scoped>

</style>