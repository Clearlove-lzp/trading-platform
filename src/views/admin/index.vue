<template>
  <div class="main-body">
    <div v-if="layOutType === '主题一'">
      <LayOutA
        :routes="routes"
        :activeName="newRoute"
        :layOutType="layOutType"
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
import { loginGetUser } from "@/api/index";
import { mapMutations } from "vuex";
import { sellerMenu, adminMenu } from "./menu.js";

export default {
  components: {
    LayOutA,
    LayOutB,
    ThemeConfig,
  },
  data() {
    return {
      layOutType: "主题一", // 主题类型
      routes: [], // 菜单路由
      newRoute: "/admin/dashboard", // 打开没有二级菜单的menuItem
      newRouteA: ["/admin/dashboard"], // 打开有二级菜单的submenu对应的menuItem
      theme: "theme4",
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
    },
    ...mapMutations("user", ["setUserInfo"]),
    getLoginInfo() {
      loginGetUser().then((res) => {
        if (res.data.code === 1) {
          this.setUserInfo(res.data.data);
        } else {
          this.$Message.error(res.data.msg);
          if (window.localStorage.getItem("role") === "admin") {
            return this.$router.push("/admin/SystemLogin");
          }
          this.$router.push("/admin/login");
        }
      });
    },
    ckeckMenu() {
      if (window.localStorage.getItem("role") === "admin") {
        this.routes = adminMenu;
      } else {
        this.routes = sellerMenu;
      }
    },
  },
  watch: {},
  mounted() {
    this.localStorageDate();
  },
  created() {
    this.ckeckMenu();
    this.checkLoyOut();
    this.getLoginInfo();
  },
  updated() {},
};
</script>

<style lang="less" scoped>
.main-body {
  overflow-x: hidden;
}

@import "view-ui-plus/dist/styles/viewuiplus.css";
</style>
