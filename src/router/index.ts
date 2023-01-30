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
    path: "/welcome",
    name: "Welcome",
    component: () => import("@/pages/WelcomePage.vue"),
    meta: {
      title: "Welcome",
    },
  },
  {
    path: "/create-account",
    name: "CreateAccount",
    component: () => import("@/pages/CreateAccountPage.vue"),
    meta: {
      title: "CreateAccount",
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
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/SampleComponents.vue"),
    meta: {
      title: "Home",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/Register.vue"),
    meta: {
      title: "Register",
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
