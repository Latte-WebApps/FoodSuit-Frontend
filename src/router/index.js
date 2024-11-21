import { createRouter, createWebHistory } from 'vue-router'
import HomeReportComponent from "../reports/pages/home-report.component.vue";
import FinanceOverviewComponent from "../finance/pages/finance-overview.component.vue";
import InventoryComponent from "../inventory/pages/inventory.component.vue";
import EmployeeComponent from "../schedules/pages/employee-component.vue";
import OrderManagementComponent from "../Orders/pages/order-management.component.vue";
import ProductivityPageComponent from "../attendance/pages/productivity-page.component.vue";
import AttendancePageComponent from "../attendance/pages/attendance-page.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import {authenticationGuard} from "../iam/services/authentication.guard.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', name: 'home', component: HomeReportComponent, meta: { title: 'Home'} },
        { path: '/finance', name: 'finance', component: FinanceOverviewComponent, meta: { title: 'Finance'} },
        { path: '/inventory', name: 'inventory', component: InventoryComponent, meta: { title: 'Inventory'} },
        { path: '/employee', name: 'employee', component: EmployeeComponent, meta: { title: 'Employee'}},
        { path: '/attendance', name: 'attendance', component: AttendancePageComponent, meta: { title: 'Attendance'}},
        { path: '/productivity', name: 'productivity', component: ProductivityPageComponent, meta: { title: 'Productivity'}},
        { path: '/order', name: 'order', component: OrderManagementComponent, meta: { title: 'Order'} },
        { path: '/sign-up', name: 'sign-up', component: SignUpComponent, meta: { title: 'Sign Up'}},
        { path: '/sign-in', name: 'sign-in', component: SignInComponent, meta: { title: 'Sign In'}},
        { path: '/', redirect: '/home' }
    ]
})

router.beforeEach((to,from,next) => {
    let baseTitle = 'FoodSuit' ;
    document.title = `${baseTitle} | ${to.meta['title']}`;
    authenticationGuard(to, from, next)
});
export default router;