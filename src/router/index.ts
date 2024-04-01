import { createWebHistory, createRouter } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('../views/QuestionsView.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      name: 'catchAll',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

export default router;
