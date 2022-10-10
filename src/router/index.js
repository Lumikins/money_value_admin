import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/Admin",
      name: "Admin",
      component: () => import("../views/AdminView.vue"),
    },
    {
      path: "/Convert",
      name: "Convert",
      component: () => import("../views/ConvertView.vue"),
    },
    {
      path: "/CurrencyList",
      name: "CurrencyList",
      component: () => import("../views/CurrencyListView.vue"),
    },
  ],
});

export default router;
