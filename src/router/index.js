import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue');
const RegisterView = () => import('../views/RegisterView.vue');
const DashboardView = () => import('../views/DashboardView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
  ]
})

export default router
