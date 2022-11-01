import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        needAuth: true,
      },
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("@/views/Signup.vue"),
      meta: {
        needAuth: false,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"),
      meta: {
        needAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.needAuth) {
    if (!userStore.user) {
      return next({ name: "Login" });
    }

    next();
  } else {
    if (userStore.user) {
      return next({ name: "Home" });
    }

    next();
  }
});

export default router;
