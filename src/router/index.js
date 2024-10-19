import { createRouter, createWebHistory } from 'vue-router'
import HomeReportComponent from "../reports/pages/home-report.component.vue";
import FinanceOverviewComponent from "../finance/pages/finance-overview.component.vue";
import InventoryComponent from "../inventory/pages/inventory.component.vue";
import EmployeeComponent from "../schedules/pages/employee-component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', name: 'home', component: HomeReportComponent, meta: { title: 'Home'} },
        { path: '/finance', name: 'finance', component: FinanceOverviewComponent, meta: { title: 'Finance'} },
        { path: '/inventory', name: 'inventory', component: InventoryComponent, meta: { title: 'Inventory'} },
        { path: '/employee', name: 'employee', component: EmployeeComponent, meta: { title: 'Employee'}},
        { path: '/', redirect: '/home' }
    ]
})

router.beforeEach((to,from,next) => {
    let baseTitle = 'FoodSuit' ;
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});
export default router;