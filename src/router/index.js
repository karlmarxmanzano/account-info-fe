import { createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('../views/HomeView.vue');
const RegisterView = () => import('../views/RegisterView.vue');
const DashboardView = () => import('../views/DashboardView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') ?? null;

  if (to.name === 'dashboard' && !isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
