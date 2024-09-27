
import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from "../public/pages/home.component.vue";
import FinanceOverviewComponent from "../finance/pages/finance-overview.component.vue";
import homeReportComponent from "../reports/components/home-report.component.vue";
//import InventoryComponent from "../inventory/pages/inventory.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', name: 'home', component: homeReportComponent, meta: { title: 'Home'} },
        { path: '/finance', name: 'finance', component: FinanceOverviewComponent, meta: { title: 'Finance'} },
        //{ path: '/inventory', name: 'inventory', component: InventoryComponent, meta: { title: 'Inventory'} },
        { path: '/', redirect: '/home' }
    ]
})

router.beforeEach((to,from,next) => {
    let baseTitle = 'FoodSuit' ;
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});
export default router;