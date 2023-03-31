<!-- 布局二 -->
<template>
  <div class="layout">
    <Layout>
      <Sider
        class="slideLeft layout-son"
        id="themenuB"
        :class="theme"
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <sideMenuA
          :routes="routes"
          :activeName="activeName"
          :openNames="openNames"
          v-show="!isCollapsed"
        ></sideMenuA>
        <sideMenuB :routes="routes" v-show="isCollapsed"></sideMenuB>
      </Sider>
      <Layout class="layout-son slideRight">
        <Header class="header-con">
          <Icon
            @click="collapsedSider"
            :class="rotateIcon"
            :style="{ margin: '0 20px' }"
            type="md-menu"
            size="24"
          ></Icon>
          <div class="NavTitml">数据交易平台</div>
          <UserHead
            :styleSheet="{
              marginRight: '10px',
              float: 'right',
              height: '68px',
            }"
          ></UserHead>
          <Fullscreen :styleSheet="styleSheet" />
          <ThemeIcon
            @showDrawerFunc="showDrawerFunc"
            :styleSheet="styleSheet"
          ></ThemeIcon>
          <!-- <ChangeLayOut @changeLayOut="changeLayOut" :styleSheet="styleSheet"></ChangeLayOut> -->
          <!-- <StyleSwitch @changeStyle="localStorageDate" :styleSheet="styleSheet"></StyleSwitch> -->
        </Header>
        <Content class="main-content-con">
          <Layout class="main-layout-con">
            <div class="tag-nav-wrapper">
              <TagsNav
                :value="$route"
                @input="handleClick"
                :list="tagNavList"
                @on-close="handleCloseTag"
              />
            </div>
            <Content class="content-wrapper">
              <router-view />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import sideMenuA from "@/components/sideMenus/sideMenuA";
import sideMenuB from "@/components/sideMenus/sideMenuB";
import UserHead from "@/components/UserHead";
import Fullscreen from "@/components/Fullscreen";
// import ChangeLayOut from "@/components/ChangeLayOut";
// import StyleSwitch from "@/components/StyleSwitch";
import TagsNav from "@/components/TagsNav";
import ThemeIcon from "@/components/ThemeIcon";

export default {
  props: ["routes", "activeName", "openNames", "theme"],
  data() {
    return {
      isCollapsed: false,
      styleSheet: {
        marginRight: "10px",
        width: "40px",
        float: "right",
      },
      tagNavList: [],
      checkResult: false,
    };
  },
  components: {
    sideMenuA,
    sideMenuB,
    UserHead,
    Fullscreen,
    // ChangeLayOut,
    // StyleSwitch,
    TagsNav,
    ThemeIcon,
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
  },
  methods: {
    // 点击显示主题风格设置
    showDrawerFunc() {
      this.$emit("showDrawer", true);
    },
    // //获取存储的主题颜色
    // localStorageDate() {
    //   let memoryColor = localStorage.getItem("themeColor");
    //   this.theme = memoryColor
    // },
    // 折叠和展开
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    // 改变布局
    changeLayOut(value) {
      localStorage.setItem("layOutType", value);
      setTimeout(() => {
        this.$parent.checkLoyOut();
      }, 50);
    },
    // 检查是否已有
    checkRoute(x, y) {
      this.checkResult = x.some((item) => {
        return item.name === y.name && item.path === y.path;
      });
    },
    // 添加标签
    addTag(newRoute) {
      let lock = this.routes.some((item) => {
        if (item.children && item.children.length > 0) {
          return item.children.some((item1) => {
            return item1.name === newRoute.name;
          });
        } else {
          return item.name === newRoute.name;
        }
      });
      if (lock) {
        // const { name, params, query, meta, path} = this.$route
        this.checkRoute(this.tagNavList, newRoute);
        if (!this.checkResult) {
          this.tagNavList.push(newRoute);
        }
      }
    },
    // 初始化标签
    initTag() {
      const { name, params, query, meta, path } = this.$route;
      this.tagNavList.push({
        name: "概览",
        params: {},
        query: {},
        meta: {},
        path: "/admin/dashboard",
      });
      this.sendChangeMenuOpen({ name, params, query, meta, path });
      this.addTag({ name, params, query, meta, path });
    },
    // 点击标签跳转路由
    handleClick(item) {
      this.$router.push({
        path: item.path,
      });
    },
    // 请求父组件改变菜单的打开状态
    sendChangeMenuOpen(newRoute) {
      this.$emit("changeMenuOpen", newRoute);
    },
    // 删除标签
    handleCloseTag(data, current) {
      this.tagNavList = data;
      if (current.name != this.$route.name) {
        return;
      }
      this.$router.push({
        path: this.tagNavList[this.tagNavList.length - 1].path,
      });
    },
  },
  watch: {
    $route(newRoute) {
      this.sendChangeMenuOpen(newRoute);
      this.addTag(newRoute);
    },
  },
  mounted() {
    // this.localStorageDate()
    this.initTag();
  },
  created() {},
};
</script>

<style scoped lang="less">
// less传参
.background (@color1, @color2) {
  background: @color1;
  background: -webkit-linear-gradient(left, @color1, @color2);
  background: -o-linear-gradient(right, @color1, @color2);
  background: -moz-linear-gradient(right, @color1, @color2);
  background: linear-gradient(to right, @color1, @color2);
}

// less传参
.colorType(@color1, @color2) {
  :deep(.ivu-layout-sider-children) {
    .ivu-menu {
      .ivu-menu-item-active {
        background: @color2 !important;
      }
      .ivu-menu-submenu {
        background: transparent !important;
        .ivu-menu {
          background: @color1;
          .ivu-menu-item-active {
            background: @color2 !important;
          }
        }
      }
    }
  }
}

.layout {
  height: 100%;
  .ivu-layout {
    display: flex;
    height: 100%;
    .layout-son {
      flex: 1;
      height: 100vh;
    }
    .slideLeft {
      flex: 0 0 200px;
      height: 100vh;
      background: transparent;
      :deep(.ivu-layout-sider-children) {
        overflow-x: hidden;
        overflow-y: scroll !important;
        margin-right: -15px;
        .ivu-menu {
          background: transparent;
          .ivu-menu-item {
            background: transparent;
          }
          .ivu-menu-item-selected {
            color: #fff;
            background: #2d8cf0;
          }
          .ivu-menu-submenu {
            background: transparent;
            .ivu-menu-submenu-title {
              background: transparent;
            }
          }
        }
      }
    }
    .slideRight {
      position: relative;
      left: -2px;
      .main-content-con {
        height: ~"calc(100% - 60px)";
        overflow: hidden;
        .main-layout-con {
          height: 100%;
          overflow: hidden;
        }
      }
      .header-con {
        background: #fff;
        padding: 0 20px;
        width: 100%;
        .NavTitml {
          width: 250px;
          position: absolute;
          left: 100px;
          top: 0;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .theme1 {
      background: #56324e;
      // .colorType(#382237, #7a4d7b)
      .colorType(#7a4d7b, #382237);
    }
    .theme2 {
      background: #00978b;
      // #29b4a9
      .colorType(#4e8682, #155d56)
      // .background(#00978b, #75e9df);
    }
    .theme3 {
      background: #3264fb;
      // .colorType(#1f43b2, #2d8cf0)
      .colorType(#2d8cf0, #1f43b2)
      // .background(#3264fb, #6ac7ff);
    }
    .theme4 {
      background: #26282e;
      .colorType(#0d0f17, #363a47)
      // .background(#26282e, #546697);
    }
  }
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}

.menu-title {
  padding-left: 6px;
}

.tag-nav-wrapper {
  padding: 0;
  height: 40px;
  background: #f0f0f0;
}

.content-wrapper {
  // padding: 18px;
  height: ~"calc(100% - 80px)";
  overflow: auto;
  overflow-x: hidden;
}
</style>