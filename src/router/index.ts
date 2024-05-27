import { createWebHistory, createRouter } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/pitanja',
      name: 'questions',
      component: () => import('../views/QuestionsView.vue'),
    },
    {
      path: '/naruci',
      name: 'order',
      component: () => import('../views/OrderView.vue'),
    },
    {
      path: '/narudzbe',
      name: 'orders',
      component: () => import('../views/OrdersListView.vue'),
      //@ts-ignore
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('authenticated');

        if (isAuthenticated) {
          next();
        } else {
          next('/login');
        }
      },
    },
    {
      path: '/korpa',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/kako-isprintati-tvit-na-majicu',
      name: 'howtoprint',
      component: () => import('../views/HowToPrintView.vue'),
    },
    {
      path: '/najpopularnije-majice',
      name: 'popular-shirts',
      component: () => import('../views/PopularShirtsView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      name: 'catchAll',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

export default router;
