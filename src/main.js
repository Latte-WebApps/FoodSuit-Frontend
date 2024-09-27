import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura'
import router from "./router/index.js";
import Chart from "primevue/chart";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import FloatLabel from "primevue/floatlabel";
import Toolbar from "primevue/toolbar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import ConfirmDialog from "primevue/confirmdialog";
import Checkbox from "primevue/checkbox";
import Select from "primevue/select";
import SelectButton from "primevue/selectbutton";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import Menu from "primevue/menu";
import ToastService from "primevue/toastservice";
import Rating from "primevue/rating";
import Row from "primevue/row";
import Drawer from "primevue/drawer";
import Tag from "primevue/tag";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";
import i18n from "./i18n.js";

const app = createApp(App);
app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
})

app.use(ConfirmationService)
    .use(DialogService)
    .use(ToastService);

app.component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-text', InputText)
    .component('pv-input-number', InputNumber)
    .component('pv-menu', Menu)
    .component('pv-rating', Rating)
    .component('pv-row', Row)
    .component('pv-tag', Tag)
    .component('pv-drawer', Drawer)
    .component('pv-textarea', Textarea)
    .component('pv-toolbar', Toolbar)
    .component('pv-toast', Toast)
    .component('pv-button', Button)
    .component('pv-column', Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-checkbox', Checkbox)
    .component('pv-data-table', DataTable)
    .component('pv-dialog', Dialog)
    .component('pv-select', Select)
    .component('pv-select-button', SelectButton)
    .component('pv-float-label', FloatLabel)
    .component('pv-chart', Chart);

app.use(i18n);

app.use(router);

app.mount('#app');
