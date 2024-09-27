import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from "../public/pages/home.component.vue";
import FinanceOverviewComponent from "../finance/pages/finance-overview.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', name: 'home', component: HomeComponent, meta: { title: 'Home'} },
        { path: '/finance', name: 'finance', component: FinanceOverviewComponent, meta: { title: 'Finance'} },
        { path: '/', redirect: '/home' }
    ]
})

router.beforeEach((to,from,next) => {
    let baseTitle = 'FoodSuit' ;
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});
export default router;