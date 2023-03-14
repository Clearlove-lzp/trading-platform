import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "登录",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/",
    name: "首页",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
  },
  {
    path: "/admin/login",
    name: "后台登录",
    component: () =>
      import(/* webpackChunkName: "admin/login" */ "../views/admin/Login.vue"),
  },
  {
    path: "/admin",
    name: "后台管理",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/admin/index.vue"),
    children: [
      {
        path: "/admin/dashboard",
        name: "概览",
        component: () =>
          import(
            /* webpackChunkName: "Login" */ "../views/admin/dashboard/index.vue"
          ),
      },
      {
        path: "/admin/userManagement",
        name: "用户管理",
        component: () =>
          import(
            /* webpackChunkName: "admin/userManagement" */ "../views/admin/userManagement/index.vue"
          ),
      },
      {
        path: "/admin/roleManagement",
        name: "角色管理",
        component: () =>
          import(
            /* webpackChunkName: "admin/roleManagement" */ "../views/admin/roleManagement/index.vue"
          ),
      },
      {
        path: "/admin/menuManagement",
        name: "菜单管理",
        component: () =>
          import(
            /* webpackChunkName: "admin/menuManagement" */ "../views/admin/menuManagement/index.vue"
          ),
      },
      {
        path: "/admin/modeManagement",
        name: "模型管理",
        component: () =>
          import(
            /* webpackChunkName: "admin/modeManagement" */ "../views/admin/modeManagement/index.vue"
          ),
      },
      {
        path: "/admin/businessManagement",
        name: "交易管理",
        component: () =>
          import(
            /* webpackChunkName: "admin/businessManagement" */ "../views/admin/businessManagement/index.vue"
          ),
      },
      {
        path: "/admin/accountManagement",
        name: "财务管理",
        component: () =>
          import(
            /* webpackChunkName: "admin/accountManagement" */ "../views/sellerSystem/accountManagement/index.vue"
          ),
      },
      {
        path: "/admin/productManagement",
        name: "商品管理",
        component: () =>
          import(
            /* webpackChunkName: "admin/productManagement" */ "../views/sellerSystem/productManagement/index.vue"
          ),
      },
      {
        path: "/admin/orderManagement",
        name: "订单管理",
        component: () =>
          import(
            /* webpackChunkName: "admin/orderManagement" */ "../views/sellerSystem/orderManagement/index.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
