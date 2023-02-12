import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/stores/profile";

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
      preLogin: true,
    },
  },
  {
    path: "/create-account",
    name: "CreateAccount",
    component: () => import("@/pages/CreateAccountPage.vue"),
    meta: {
      title: "CreateAccount",
      preLogin: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginPage.vue"),
    meta: {
      title: "Login",
      preLogin: true,
    },
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/HomePage.vue"),
    meta: {
      title: "Home",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/RegisterPage.vue"),
    meta: {
      title: "Register",
    },
  },
  {
    path: "/food/list",
    name: "foodList",
    component: () => import("@/pages/FoodsListPage.vue"),
    meta: {
      title: "Food List",
    },
  },
  {
    path: "/workout/list",
    name: "WorkoutList",
    component: () => import("@/pages/WorkoutListPage.vue"),
    meta: {
      title: "Workout List",
    },
  },
  {
    path: "/chart",
    name: "Chart",
    component: () => import("@/pages/GraphPage.vue"),
    meta: {
      title: "Chart",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/pages/ProfilePage.vue"),
    meta: {
      title: "Profile",
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

router.beforeEach((to) => {
  const email = useProfileStore().email;
  // check if the next page is required to login and email is set on pinia store
  if (!email && !to.meta.preLogin) {
    return "/login";
  }
});

export default router;
