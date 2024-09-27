import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura'
import Toolbar from "primevue/toolbar";
import Toast from "primevue/toast";


const app = createApp(App);
app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Aura
    }
})

app.component('pv-toolbar', Toolbar)
    .component('pv-toast', Toast);

app.mount('#app')
