import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/sample",
    name: "sample",
    component: () => import("@/pages/SampleComponents.vue"),
    meta: {
      title: "sample画面",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginPage.vue"),
    meta: {
      title: "Login",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title as string;
});

export default router;
