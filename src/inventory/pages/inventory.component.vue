<script>
import {Item} from "../model/item.entity.js";
import {ItemService} from "../services/item.service.js";
import { Report } from "../../finance/model/report.entity.js";
import { ReportService } from "../../finance/services/report.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import ItemCreateAndEditDialog from "../components/item-create-and-edit.component.vue";
import StockEditDialog from "../components/stock-edit.component.vue";

export default {
  name: "inventory",
  components: {ItemCreateAndEditDialog, DataManager, StockEditDialog},
  data() {
    return {
      title: {singular: "Item", plural: "Items"},
      items: [],
      item: new Item({}),
      selectedItems: [],
      itemService: null,
      createAndEditDialogIsVisible: false,
      stockDialogIsVisible: false,
      isEdit: false,
      isEditStock: false,
      submitted: false,
      isIncrease: true,
      quantityChange: 0,

      reportService: null
    }
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 1000});
    },
    findIndexById(id) {
      return this.items.findIndex(item => item.id === id);
    },
    // Event Handlers
    onNewItem() {
      this.item = new Item({});
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
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
      this.stockDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
      this.isEditStock = false;
    },

    onSaveRequested(updatedItem) {
      console.log('Updated item:', updatedItem); // Confirmar que el cambio tiene el signo correcto
      this.submitted = true;
      if (this.isEditStock) {
        this.item.quantity += updatedItem.quantityChange;
        console.log('New quantity:', this.item.quantity);
        this.updateQuantityItem();
        if (updatedItem.quantityChange > 0)
          this.generateReport(this.item, updatedItem.quantityChange);
      } else if (updatedItem.id) {
        this.updateItem();
      } else {
        this.createItem();
      }

      this.createAndEditDialogIsVisible = false;
      this.stockDialogIsVisible = false;
      this.isEdit = false;
      this.isEditStock = false;
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
        let index = this.findIndexById(this.item.id);
        this.items[index] = new Item(response.data);

      }).catch(error => console.error(error));
    },
    updateQuantityItem() {
      this.itemService.patch(this.item.id, { quantity: this.item.quantity }).then(response => {
        let index = this.findIndexById(this.item.id);
        this.items[index] = new Item(response.data);
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
    },
    onIncreaseStock(item) {
      this.item = new Item({ ...item });
      this.isEditStock = true;
      this.submitted = false;
      this.stockDialogIsVisible = true;
      this.isIncrease = true;  // Indica que es una operación de incremento
    },

    onDecreaseStock(item) {
      this.item = new Item({ ...item });
      this.isEditStock = true;
      this.submitted = false;
      this.stockDialogIsVisible = true;
      this.isIncrease = false; // Indica que es una operación de decremento
    },

    // Report generation methods
    generateReport(item, quantityChange) {
      console.log('Generating report for item:', item, 'quantity change:', quantityChange);
      const date = new Date().toISOString().split('T')[0];
      const description = `(Replenishment) ${quantityChange} units of ${item.name}`;
      const priceResult = item.price * quantityChange;

      const report = new Report ({
        description,
        reportType: 'Expense',
        date,
        amount: priceResult,
        productsId: item.id,
        ordersId: 0
      });
      console.log('Adding report: ', report)
      this.reportService.create(report).then(response => {
        console.log('Report created:', response.data);
      }).catch(error => console.error(error));
    }

  },
  // Lifecycle Hooks
  created() {
    this.itemService = new ItemService();
    this.itemService.getAll().then(response => {
      this.items = response.data.map(item => new Item(item));
    }).catch(error => console.error(error));
    this.reportService = new ReportService();
  }
}
</script>

<template>
  <div class="w-full mt-8">
    <data-manager :title="title"
                  v-bind:items="items"
                  v-on:new-item-requested="onNewItem"
                  v-on:edit-item-requested="onEditItem($event)"
                  v-on:delete-item-requested="onDeleteItem($event)"
                  v-on:delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns >
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 10rem" class="bg-gray-100" />
        <pv-column :sortable="true" field="name" header="Name" style="min-width: 12rem" class="bg-gray-100 " />
        <pv-column :sortable="true" field="quantity" header="Stock" style="min-width: 10rem" class="bg-gray-100 flex justify-content-center w-12rem ">
          <template #body="slotProps">
            <div class="quantity-cell">
              <pv-button icon="pi pi-minus"    severity="danger"   rounded outlined @click="onDecreaseStock(slotProps.data)" />
              <pv-tag :severity="slotProps.data.quantity < 10 ? 'danger' : 'success'">
                {{ slotProps.data.quantity }}
              </pv-tag>
              <pv-button icon="pi pi-plus"  rounded outlined  @click="onIncreaseStock(slotProps.data)" />
            </div>
          </template>
        </pv-column>
        <pv-column field="imageUrl" header="imageUrl" style="width: 10rem" class="bg-gray-100" >
          <template #body="slotProps">
            <img :src="slotProps.data.imageUrl" style="width: 100%; height: auto; border-radius: 4px;"  alt="Image not found"/>
          </template>
        </pv-column>
      </template>
    </data-manager>
    <item-create-and-edit-dialog
        :edit="isEdit"
        :item="item"
        :visible="createAndEditDialogIsVisible"
        entity-name="Item"
        v-on:cancel-requested="onCancelRequested"
        v-on:save-requested="onSaveRequested($event)"/>
    <stock-edit-dialog
        :item="item"
        :visible="stockDialogIsVisible"
        entity-name="Modificar Stock"
        :is-increase="isIncrease"
        v-on:cancel-requested="onCancelRequested"
        v-on:save-requested="onSaveRequested($event)"/>
  </div>
</template>

<style scoped>
.quantity-cell {
  display: flex;
  align-items: center;

}


</style>