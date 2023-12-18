import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from "@/views/RegisterView.vue"; 
import LoginView from "@/views/LoginView.vue"; 
import AdminPanel from "@/views/AdminPanel.vue";
import ItemsData from "@/views/ItemsData.vue";  
import AdminPanelCat from "@/views/AdminPanelCat.vue";
import AdminPanelCus from "@/views/AdminPanelCus.vue";
import ModeratorPanel from "@/views/ModeratorPanel.vue";

const routes = [
    { path: '/register', component: RegisterView, name: 'RegisterView' }, 
    { path: '/login', component: LoginView, name: 'LoginView' },
    { path: '/admincon', component: AdminPanel, name: 'AdminPanel' },
    { path: '/item', component: ItemsData, name: 'ItemsData' },
    { path: '/categories', component: AdminPanelCat, name: 'AdminPanelCat' },
    { path: '/customer', component: AdminPanelCus, name: 'AdminPanelCus' },
    { path: '/moderator', component: ModeratorPanel, name: 'ModeratorPanel' },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});



export default router;



