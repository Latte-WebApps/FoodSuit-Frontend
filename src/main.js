import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeflex/primeflex.css';
import "primeflex/themes/primeone-light.css"
import 'primeicons/primeicons.css';

import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";
import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import Checkbox from "primevue/checkbox";
import DataTable from "primevue/datatable";
import Chart from "primevue/chart";
import Dialog from "primevue/dialog";
import Select from "primevue/select";
import FileUpload from "primevue/fileupload";
import FloatLabel from "primevue/floatlabel";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Menu from "primevue/menu";
import Rating from "primevue/rating";
import Row from "primevue/row";
import Toast from "primevue/toast";
import i18n from "./i18n.js";
import SelectButton from "primevue/selectbutton";
import router from './router/index.js';
import Toolbar from "primevue/toolbar";
import Tag from "primevue/tag";
import Drawer from "primevue/drawer";
import Textarea from "primevue/textarea";


const app = createApp(App);
app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'light'
        }
    }
})
app.use(ConfirmationService)
    .use(DialogService)
    .use(ToastService);

app.component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-column', Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-checkbox', Checkbox)
    .component('pv-data-table', DataTable)
    .component('pv-dialog', Dialog)
    .component('pv-select', Select)
    .component('pv-select-button', SelectButton)
    .component('pv-file-upload', FileUpload)
    .component('pv-float-label', FloatLabel)
    .component('pv-icon-field', IconField)
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
    .component('pv-chart', Chart);


app.use(i18n);
app.use(router);

app.mount('#app');  
