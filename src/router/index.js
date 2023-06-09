import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/login",
    name: "前台登录",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/front/Login.vue"),
  },
  {
    path: "/register",
    name: "前台注册",
    component: () =>
      import(/* webpackChunkName: "Register" */ "../views/front/Register.vue"),
  },
  {
    path: "/",
    name: "Home",
    // redirect: "/index",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/front/index.vue"),
    children: [
      {
        path: "/index",
        name: "首页",
        component: () =>
          import(
            /* webpackChunkName: "homePage" */ "../views/front/homePage/index.vue"
          ),
      },
      {
        path: "/product/:data_id",
        name: "产品详情",
        component: () =>
          import(
            /* webpackChunkName: "productDetails" */ "../views/front/productDetails/index.vue"
          ),
      },
      {
        path: "/orderlist",
        name: "我的订单",
        component: () =>
          import(
            /* webpackChunkName: "orderlist" */ "../views/front/orderlist/index.vue"
          ),
      },
      {
        path: "/shoppingCart",
        name: "我的购物车",
        component: () =>
          import(
            /* webpackChunkName: "shoppingCart" */ "../views/front/shoppingCart/index.vue"
          ),
      },
      {
        path: "/orderConfirm",
        name: "订单确认",
        component: () =>
          import(
            /* webpackChunkName: "orderConfirm" */ "../views/front/orderConfirm/index.vue"
          ),
      },
      {
        path: "/orderPay",
        name: "订单支付",
        component: () =>
          import(
            /* webpackChunkName: "orderPay" */ "../views/front/orderPay/index.vue"
          ),
      },
      {
        path: "/orderAlipay",
        name: "订单阿里支付",
        component: () =>
          import(
            /* webpackChunkName: "orderAlipay" */ "../views/front/orderAlipay/index.vue"
          ),
      },
      {
        path: "/dataProduct",
        name: "数据产品",
        component: () =>
          import(
            /* webpackChunkName: "dataProduct" */ "../views/front/dataProduct/index.vue"
          ),
      },
      {
        path: "/dataServe",
        name: "数据服务",
        component: () =>
          import(
            /* webpackChunkName: "dataServe" */ "../views/front/dataServe/index.vue"
          ),
      },
      {
        path: "/structuredData",
        name: "结构化数据",
        component: () =>
          import(
            /* webpackChunkName: "structuredData" */ "../views/front/structuredData/index.vue"
          ),
      },
      {
        path: "/imgData",
        name: "图片数据",
        component: () =>
          import(
            /* webpackChunkName: "imgData" */ "../views/front/imgData/index.vue"
          ),
      },
      {
        path: "/textData",
        name: "文本数据",
        component: () =>
          import(
            /* webpackChunkName: "textData" */ "../views/front/textData/index.vue"
          ),
      },
      {
        path: "/videoData",
        name: "视频数据",
        component: () =>
          import(
            /* webpackChunkName: "videoData" */ "../views/front/videoData/index.vue"
          ),
      },
      {
        path: "/radioData",
        name: "音频数据",
        component: () =>
          import(
            /* webpackChunkName: "radioData" */ "../views/front/radioData/index.vue"
          ),
      },
      {
        path: "/otherData",
        name: "其他",
        component: () =>
          import(
            /* webpackChunkName: "otherData" */ "../views/front/otherData/index.vue"
          ),
      },
      {
        path: "/orderDetail",
        name: "订单详情",
        component: () =>
          import(
            /* webpackChunkName: "orderDetail" */ "../views/front/orderDetail/index.vue"
          ),
      },
    ],
  },
  {
    path: "/admin/login",
    name: "卖家登录",
    component: () =>
      import(/* webpackChunkName: "admin/login" */ "../views/admin/Login.vue"),
  },
  {
    path: "/admin/SystemLogin",
    name: "平台登录",
    component: () =>
      import(
        /* webpackChunkName: "admin/systemLogin" */ "../views/admin/SystemLogin.vue"
      ),
  },
  {
    path: "/admin/register",
    name: "卖家注册",
    component: () =>
      import(
        /* webpackChunkName: "admin/Register" */ "../views/admin/Register.vue"
      ),
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
            /* webpackChunkName: "admin/accountManagement" */ "../views/admin/accountManagement/index.vue"
          ),
      },
      {
        path: "/admin/productManagement",
        name: "商品管理",
        component: () =>
          import(
            /* webpackChunkName: "admin/productManagement" */ "../views/admin/productManagement/index.vue"
          ),
      },
      {
        path: "/admin/orderManagement",
        name: "订单管理",
        component: () =>
          import(
            /* webpackChunkName: "admin/orderManagement" */ "../views/admin/orderManagement/index.vue"
          ),
      },
      {
        path: "/admin/adminCenter",
        name: "管理员个人中心",
        component: () =>
          import(
            /* webpackChunkName: "admin/adminCenter" */ "../views/admin/personerCenter/adminCenter.vue"
          ),
      },
      {
        path: "/admin/sellerCenter",
        name: "卖家个人中心",
        component: () =>
          import(
            /* webpackChunkName: "admin/sellerCenter" */ "../views/admin/personerCenter/sellerCenter.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
