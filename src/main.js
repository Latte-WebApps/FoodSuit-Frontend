import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura';
import router from './router'; // Ruta relativa

const app = createApp(App);

app.use(router);
app.mount('#app');