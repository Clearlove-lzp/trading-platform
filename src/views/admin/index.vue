<template>
  <div class="main-body">
    <!-- 主题一和主题三共用一个组件，具体组件内差别对待 -->
    <div v-if="layOutType === '主题一' || layOutType === '主题三'">
      <LayOutA
        :routes="routes"
        :activeName="newRoute"
        :openNames="newRouteA"
        :layOutType="layOutType"
        :idx="idx"
        @changeMenuOpen="changeMenuOpen"
        @showDrawer="showDrawer"
        :theme="theme"
      ></LayOutA>
    </div>
    <div v-else-if="layOutType === '主题二'">
      <LayOutB
        :routes="routes"
        :activeName="newRoute"
        :openNames="newRouteA"
        @changeMenuOpen="changeMenuOpen"
        @showDrawer="showDrawer"
        :theme="theme"
      ></LayOutB>
    </div>
    <ThemeConfig
      ref="themeConfig"
      @changeLayOut="changeLayOut"
      :layOutType="layOutType"
      :theme="theme"
      @localStorageDate="localStorageDate"
    ></ThemeConfig>
  </div>
</template>

<script>
import LayOutA from "@/components/layout/LayOutA";
import LayOutB from "@/components/layout/LayOutB";
import ThemeConfig from "@/components/ThemeConfig.vue";

export default {
  components: {
    LayOutA,
    LayOutB,
    ThemeConfig
  },
  data() {
    return {
      layOutType: "主题一", // 主题类型
      routes: [
        {
          path: "/admin/dashboard",
          name: "概览",
          Icon: "md-home"
        },
        {
          path: "/admin/businessManagement",
          name: "交易管理",
          Icon: "ios-paper",
        },
        {
          path: "/admin/modeManagement",
          name: "模型管理",
          Icon: "ios-paper",
        },
        {
          path: "/admin/accountManagement",
          name: "财务管理",
          Icon: "ios-paper",
        },
        {
          path: "/admin/productManagement",
          name: "商品管理",
          Icon: "ios-paper",
        },
        {
          path: "/admin/orderManagement",
          name: "订单管理",
          Icon: "ios-paper",
        },
        {
          path: "/admin",
          name: "系统管理",
          Icon: "ios-paper",
          redirect: "/admin/userManagement",
          children: [
            {
              path: "userManagement",
              name: "用户管理"
            },
            {
              path: "roleManagement",
              name: "角色管理"
            },
            {
              path: "menuManagement",
              name: "菜单管理"
            }
          ]
        }
      ], // 菜单路由
      newRoute: "/admin/dashboard", // 打开没有二级菜单的menuItem
      newRouteA: ["/admin/dashboard"], // 打开有二级菜单的submenu对应的menuItem
      idx: 0, // 向布局三传递二级菜单下标
      theme: "theme4"
    };
  },
  computed: {},
  methods: {
    //获取存储的主题颜色
    localStorageDate() {
      if (localStorage.getItem("themeColor")) {
        let memoryColor = localStorage.getItem("themeColor");
        this.theme = memoryColor;
      }
    },
    // 改变布局
    changeLayOut(value) {
      localStorage.setItem("layOutType", value);
      setTimeout(() => {
        this.checkLoyOut();
      }, 50);
    },
    // 打开修改风格的界面
    showDrawer(value) {
      this.$refs.themeConfig.showDrawer = value;
    },
    // 检查布局类型
    checkLoyOut() {
      if (localStorage.getItem("layOutType")) {
        this.layOutType = localStorage.getItem("layOutType");
      }
    },
    // 改变菜单栏打开状况
    changeMenuOpen(newRoute) {
      this.newRoute = newRoute.path;
      let str = newRoute.path.split("/")[1];
      this.newRouteA = [`/${str}`];
      // 以下布局三所需
      this.routes.forEach((item, index) => {
        if (item.path === this.newRouteA[0]) {
          this.idx = index;
        }
      });
    }
  },
  watch: {},
  mounted() {
    this.localStorageDate();
  },
  created() {
    this.checkLoyOut();
  },
  updated() {}
};
</script>

<style lang="less" scoped>
.main-body {
  overflow-x: hidden;
}
</style>
