import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/questions",
      name: "questions",
      component: () => import("../views/QuestionsView.vue"),
    },
    {
      path: "/order/:tweetUrl",
      name: "order",
      component: () => import("../views/OrderView.vue"),
      props: true
    },
    {
      path: "/:catchAll(.*)*",
      name: "catchAll",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
