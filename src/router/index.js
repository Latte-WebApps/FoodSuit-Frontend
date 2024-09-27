import {createRouter, createWebHistory} from "vue-router";
import EmployeeComponent from "../schedules/pages/employee.component.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/',   name: 'Employee', component: EmployeeComponent, meta: { title: 'Employee'}},
    ]
});

router.beforeEach((to,
                   from,
                   next) => {
    let baseTitle = 'FoodSuit';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});
export default router;