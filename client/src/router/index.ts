import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import store from "@/store/Authentification/state";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About/AboutView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profil",
    name: "profil",
    component: () => import("../views/Profil/ProfilView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/* ---------------------------
Redirect if no authenticate
--------------------------- */
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !store.getters.getUserStatus(store.state)) {
    return {
      path: "/profil",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
