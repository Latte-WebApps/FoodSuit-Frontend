import {createRouter, createWebHistory} from "vue-router";
import InventoryComponent from "../inventory/pages/inventory.component.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/',   name: 'Inventory', component: InventoryComponent, meta: { title: 'Inventory'}},
        { path: '/',                        redirect: '/' }
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