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
      path: '/:catchAll(.*)*',
      name: 'catchAll',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

export default router;
