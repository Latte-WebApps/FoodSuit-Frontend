<script>
import { FilterMatchMode } from '@primevue/core/api';
export default {
  name: "data-manager",
  inheritAttrs: false,
  props: {
    items: {type: Array, required: true},
    employee: {type: Array, required: true},
    title: {type: {singular: '', plural: ''}, required: true},
    dynamic: {type: Boolean, default: false},
    columns: {type: Array, default: () => []}
  },
  data() {
    return {
      selectedItems: [],
      selectedEmployee: [],
      filters: null
    }
  },
  methods:
      {
        initFilters() {
          this.filters = { global: { value: null, matchMode: FilterMatchMode.CONTAINS } };
        },
        newItem() {
          this.$emit('new-item-requested');
        },
        newEmployee() {
          this.$emit('new-employee-requested');
        },
        confirmDeleteSelected() {
          this.$confirm.require( {
            message:      `Are you sure you want to delete the selected ${this.title.plural}?`,
            header:       'Confirmation',
            icon:         'pi pi-exclamation-triangle',
            rejectClass:  'p-button-secondary p-button-outlined',
            rejectLabel:  'Cancel',
            acceptLabel:  'Delete',
            acceptClass:  'p-button-danger',
            acceptItem:       () => this.$emit('delete-selected-items-requested', this.selectedItems),
            acceptEmployee:       () => this.$emit('delete-selected-employees-requested', this.selectedEmployee),
            reject:       () => {}
          });
        },
        exportToCsv() {
          this.$refs.dt.exportCSV();
        },
        editItem(item) {
          this.$emit('edit-item-requested', item);
        },
        confirmDeleteItem(item) {},
        editEmployee(employee) {
          this.$emit('edit-employee-requested', employee);
        },
        confirmDeleteEmployee(employee) {
          this.$confirm.require( {
            message:      `Are you sure you want to delete this ${this.title.singular}?`,
            header:       'Confirmation',
            icon:         'pi pi-exclamation-triangle',
            rejectClass:  'p-button-secondary p-button-outlined',
            rejectLabel:  'Cancel',
            acceptLabel:  'Delete',
            acceptClass:  'p-button-danger',
            acceptItem:       () => this.$emit('delete-item-requested', item),
            acceptEmployee:       () => this.$emit('delete-employee-requested', employee),
            reject:       () => {}
          });
        }
      },
  created() {
    this.initFilters();
  }
}
</script>

<template >
  <h3>Manage {{ title.plural }}</h3>
  <!-- Toolbar Section -->
  <pv-toolbar class="mb-2 ">
    <template #end>
      <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="newItem"/>
      <pv-button :disabled="!selectedItems || !selectedItems.length" icon="pi pi-trash" label="Delete"
                 severity="danger" @click="confirmDeleteSelected"/>
    </template>

  </pv-toolbar>
  <!-- Data Table Section -->
  <pv-data-table

      ref="dt"
      v-model:selection="selectedItems"
      :filters="filters"
      :paginator="true"
      :rows="10"
      :rows-per-page-options="[10,20,30]"
      :value="items"
      current-page-report-template="Showing {first} to {last} of {totalRecords} ${{ title.plural }}"
      data-key="id"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">
    <pv-column :exportable="false" selection-mode="multiple" style="width: 3rem" />
  </pv-data-table>
  <template>
  <h3>Manage {{ title.plural }}</h3>
  <!-- Toolbar Section -->
  <pv-toolbar class="mb-4">
    <template #start>
      <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="newEmployee"/>
      <pv-button :disabled="!selectedEmployee || !selectedEmployee.length" icon="pi pi-trash" label="Delete"
                 severity="danger" @click="confirmDeleteSelected"/>
    </template>
    <template #end>
      <pv-button icon="pi pi-download" label="Export" severity="help" @click="exportToCsv"/>
    </template>
  </pv-toolbar>
  <!-- Data Table Section -->
  <pv-data-table
      ref="dt"
      v-model:selection="selectedEmployee"
      :filters="filters"
      :paginator="true"
      :rows="10"
      :rows-per-page-options="[5,10,15]"
      :value="employee"
      current-page-report-template="Showing {first} to {last} of {totalRecords} ${{ title.plural }}"
      data-key="id"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">
    <pv-column :exportable="false" selection-mode="multiple" style="width: 3rem"/>
    <slot name="custom-columns"></slot>
    <pv-column v-if="dynamic" v-for="column in columns" :key="column.field"
               :field="column.field"
               :header="column.header"/>
    <pv-column :exportable="false" style="min-width: 8rem">
      <template #body="slotProps">
        <pv-button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(slotProps.data)"/>
        <pv-button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteItem(slotProps.data)"/>
        <pv-button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editEmployee(slotProps.data)"/>
        <pv-button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteEmployee(slotProps.data)"/>
      </template>
    </pv-column>
  </pv-data-table>
</template>
</template>

<style scoped>

</style>