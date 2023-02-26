import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/FrontLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/front/HomeView.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("../views/front/AboutView.vue"),
        },
        {
          path: "products",
          component: () => import("../views/front/ProductsView.vue"),
        },
        {
          path: "product/:id",
          component: () => import("../views/front/ProductView.vue"),
        },
        {
          path: "cart",
          component: () => import("../views/front/CartView.vue"),
        },
        {
          path: "login",
          component: () => import("../views/front/LoginView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("../views/DashboardView.vue"),
      children: [
        {
          path: "orders",
          component: () => import("../views/admin/AdminOrders.vue"),
        },
        {
          path: "products",
          component: () => import("../views/admin/AdminProducts.vue"),
        },
      ],
    },
  ],
});

export default router;
