<script>
import {Item} from "../model/item.entity.js";
import {ItemService} from "../services/item.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import ItemCreateAndEditDialog from "../components/item-create-and-edit.component.vue";

export default {
  name: "inventory",
  components: {ItemCreateAndEditDialog, DataManager},
  data() {
    return {
      title: {singular: "Item", plural: "Items"},
      items: [],
      item: new Item({}),
      selectedItems: [],
      itemService: null,
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
      return this.items.findIndex(item => item.id === id);
    },
    // Event Handlers
    onNewItem() {
      this.item = new Item({});
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },
    onEditItem(item) {
      this.item = new Item(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItem(item) {
      this.item = new Item(item);
      this.deleteItem();
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedItems = selectedItems;
      this.deleteSelectedItems();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (this.item.name.trim()) {
        if (item.id) {
          this.updateItem();
        } else {
          this.createItem();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    // Service client methods
    createItem() {
      this.itemService.create(this.item).then(response => {
        let item = new Item(response.data);
        this.items.push(item);
        this.notifySuccessfulAction("Item created successfully");
      }).catch(error => console.error(error));
    },
    updateItem() {
      this.itemService.update(this.item.id, this.item).then(response => {
        console.log('updateItem');
        let index = this.findIndexById(this.item.id);
        this.items[index] = new Item(response.data);
        console.log(this.items);
        this.notifySuccessfulAction("Item updated successfully");
      }).catch(error => console.error(error));
    },
    deleteItem() {
      this.itemService.delete(this.item.id).then(() => {
        let index = this.findIndexById(this.item.id);
        this.items.splice(index, 1);
        this.notifySuccessfulAction("Item deleted successfully");
      }).catch(error => console.error(error));
    },
    deleteSelectedItems() {
      this.selectedItems.forEach((item) => {
        this.itemService.delete(item.id).then(() => {
          this.items = this.items.filter((c) => c.id !== item.id);
        });
      });
      this.notifySuccessfulAction("Selected Items deleted successfully");
    }
  },
  // Lifecycle Hooks
  created() {
    this.itemService = new ItemService();
    this.itemService.getAll().then(response => {
      this.items = response.data.map(item => new Item(item));
      console.log(this.items);
    }).catch(error => console.error(error));
  }

}
</script>

<template>
  <div class="w-full">
    <data-manager :title="title"
                  v-bind:items="items"
                  v-on:new-item-requested="onNewItem"
                  v-on:edit-item-requested="onEditItem($event)"
                  v-on:delete-item-requested="onDeleteItem($event)"
                  v-on:delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 10rem"/>
        <pv-column :sortable="true" field="name" header="Name" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="quantity" header="Stock" style="min-width: 10rem"/>
        <pv-column :sortable="true" field="image" header="Image" style="min-width: 10rem"/>
      </template>
    </data-manager>
    <item-create-and-edit-dialog
        :edit="isEdit"
        :item="item"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested="onCancelRequested"
        v-on:save-requested="onSaveRequested($event)"/>
  </div>
</template>

<style scoped>

</style>