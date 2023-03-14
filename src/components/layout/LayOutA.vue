<!-- 布局一 -->
<template>
  <div>
    <div class="cep-header">
      <div class="head-v3">
        <div id="themenu" :class="theme">
          <div class="NavItem">
            <img src="../../assets/logo-login-mobile.png" class="home-class">
            <div class="NavLine"></div>
            <h2 class="NavTitml">数据交易平台</h2>
          </div>
          <div class="navigation-up">
            <!-- 主题一部分的顶部菜单 -->
            <template v-if="layOutType === '主题一'">
              <TopMenuA :routes="routes" :activeName="activeName"></TopMenuA>
            </template>
            <!-- 主题三部分的顶部菜单 -->
            <template v-else>
              <TopMenuB :routes="routes" :activeName="openNames[0]"></TopMenuB>
            </template>
          </div>
          <ThemeIcon @showDrawerFunc="showDrawerFunc"></ThemeIcon>
          <Fullscreen v-model="isFullscreen" />
          <!-- <StyleSwitch @changeStyle="localStorageDate"></StyleSwitch>
          <ChangeLayOut @changeLayOut="changeLayOut"></ChangeLayOut> -->
          <UserHead></UserHead>
        </div>
      </div>
    </div>
    <div class="cep-content">
      <!-- 主题三副菜单 只在主题三出现, 并且没有二级菜单不出现 -->
      <div ref="sideLeftC" class="layout-content sideLeftC" :class="theme" v-if="layOutType === '主题三' && routes[idx].children && routes[idx].children.length > 0">
        <div class="expand" @click.stop="change"><Icon type="ios-arrow-dropleft-circle" /></div>
        <div class="shrink" @click.stop="change"><Icon type="ios-arrow-dropright-circle" /></div>
        <sideMenuC class="side-menu" :collpase="collpase" :routes="routes" :idx="idx" :activeName="activeName"></sideMenuC>
      </div>
      <div class="layout-content">
        <!-- 主题一的面包屑 -->
        <PathLink v-if="layOutType === '主题一'"></PathLink>
        <!-- 主题三的标签页 -->
        <div class="tag-nav-wrapper" v-else>
          <TagsNav
            :value="$route"
            @input="handleClick"
            :list="tagNavList"
            @on-close="handleCloseTag"
          />
        </div>
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import StyleSwitch from '../StyleSwitch'
// import ChangeLayOut from '../ChangeLayOut'
import ThemeIcon from '../ThemeIcon'
import Fullscreen from '../Fullscreen'
import UserHead from '../UserHead'
import PathLink from "@/components/PathLink";
import TopMenuA from "@/components/topMenus/TopMenuA";
import TopMenuB from "@/components/topMenus/TopMenuB";
import sideMenuC from "@/components/sideMenus/sideMenuC";
import TagsNav from "@/components/TagsNav";

export default {
  props: ['routes', 'activeName', 'layOutType', 'openNames', 'idx', 'theme'],
  data() {
    return {
      isFullscreen: false,
      collpase: false,
      tagNavList: [],
    };
  },
  methods: {
    // 添加标签
    addTag(newRoute) {
      let lock = this.routes.some(item => {
        if(item.children && item.children.length > 0) {
          return item.children.some(item1 => {
            return item1.name === newRoute.name
          })
        }else{
          return item.name === newRoute.name
        }
      })
      if(lock) {
        // const { name, params, query, meta, path} = this.$route
        this.checkRoute(this.tagNavList, newRoute)
        if(!this.checkResult) {
          this.tagNavList.push(newRoute)
        }
      }
    },
    // 点击标签跳转路由
    handleClick(item) {
      this.$router.push({
        path: item.path
      })
    },
    // 删除标签
    handleCloseTag(data, current) {
      this.tagNavList = data
      if(current.name != this.$route.name) {
        return
      }
      this.$router.push({
        path: this.tagNavList[this.tagNavList.length - 1].path
      })
    },
    // 检查是否已有
    checkRoute(x, y) {
      this.checkResult = x.some(item => {
        return (item.name === y.name && item.path === y.path)
      })
    },
    // 初始化标签
    initTag() {
      const { name, params, query, meta, path} = this.$route
      this.tagNavList.push({
        name: "概览",
        params: {},
        query: {},
        meta: {},
        path: "/admin/dashboard",
      })
      this.sendChangeMenuOpen({ name, params, query, meta, path})
      this.addTag({ name, params, query, meta, path})
    },
    // 点击显示主题风格设置
    showDrawerFunc(value) {
      this.$emit('showDrawer', value)
    },
    // 点击展开或收缩左菜单
    change(e) {
      // 增加class和去掉class
      this.$refs.sideLeftC.classList.toggle("change")
      this.collpase = !this.collpase
    },
    // // 切换布局方式
    // changeLayOut(value) {
    //   localStorage.setItem('layOutType', value)
    //   setTimeout(() => {
    //     this.$parent.checkLoyOut()
    //   }, 50)
    // },
    // //存储主题颜色
    // localStorageDate() {
    //   let memoryColor = localStorage.getItem("themeColor");
    //   this.theme1 = memoryColor
    // },
    // 请求父组件改变菜单的打开状态
    sendChangeMenuOpen(newRoute) {
      this.$emit('changeMenuOpen', newRoute)
    },
  },
  components: {
    // StyleSwitch,
    // ChangeLayOut,
    ThemeIcon,
    Fullscreen,
    UserHead,
    PathLink,
    TopMenuA,
    TopMenuB,
    sideMenuC,
    TagsNav
  },
  mounted() {
    this.initTag()
    // this.$nextTick(() => {
    //   const { name, params, query, meta, path} = this.$route
    //   // this.localStorageDate();
    //   this.sendChangeMenuOpen({ name, params, query, meta, path})
    // })
  },
  watch: {
    '$route' (newRoute) {
      this.sendChangeMenuOpen(newRoute)
      this.addTag(newRoute)
    },
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
// sass混合传参
@mixin background($color1, $color2) {
  background: $color1;
  background: -webkit-linear-gradient(left, $color1, $color2);
  background: -o-linear-gradient(right, $color1, $color2);
  background: -moz-linear-gradient(right, $color1, $color2);
  background: linear-gradient(to right, $color1, $color2);
}

// sass混合传参
@mixin sideBg($color1) {
  .side-menu{
    /deep/ .sides{
      .ivu-menu-item-group{
        ul{
          .ivu-menu-item-active{
            background: $color1;
            &:hover{
              background: $color1;
            }
          }
        }
      }
    }
  }
}

// 左菜单栏动画
@keyframes movingLeft {
  from {
    flex: 0 0 200px;
  }
  to{
    flex: 0 0 0px;
  }
}

@keyframes movingNone{
  from {
    opacity: 1;
    z-index: 2;
  }
  to{
    opacity: 0;
    z-index: 1;
  }
}

@keyframes movingBlock{
  from {
    opacity: 0;
    z-index: 1;
  }
  to{
    opacity: 1;
    z-index: 2;
  }
}

@keyframes movingRight {
  from {
    flex: 0 0 0px;
  }
  to{
    flex: 0 0 200px;
  }
}

.cep-header {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100;
}

.head-v3 {
  z-index: 100;
  min-width: 1000px;
}
.head-v3 .navigation-inner {
  margin: 0 auto;
  width: 980px;
  position: relative;
}
.navigation-up {
  height: 60px;
  @include background(#26282e, #546697)
}

.tag-nav-wrapper {
  padding: 0;
  height: 40px;
  background: #f0f0f0;
}

.NavItem {
  display: inline-flex;
  float: left;
  margin-right: 30px;
  .home-class {
    height: 60px;
    margin-right: 10px;
    margin-left: 10px;
  }
  .NavLine {
    border: 0px;
    border-right-style: solid;
    border-top-width: 1px;
    border-color: white;
    height: 40px;
    margin-top: 10px;
    margin-right: 5px;
  }
  .NavTitml {
    color: white;
    margin-top: 15px;
  }
}

.theme1 {
  .navigation-up {
    @include background(#56324e, #b35782);
  }
}
.theme2 {
  .navigation-up {
    @include background(#00978b, #75e9df);
  }
}
.theme3 {
  .navigation-up {
    @include background(#3264fb, #6ac7ff);
  }
}
.theme4 {
  .navigation-up {
    @include background(#26282e, #546697);
  }
}

/deep/ .ivu-select-dropdown {
  z-index: 100;
}

.cep-content {
  background-color: rgb(238, 238, 238);
  display: flex;
  .layout-content{
    flex: 1;
    background: #f5f7f9;
  }
  .sideLeftC{
    flex: 0 0 200px;
    background-color: #fff;
    position: relative;
    animation: movingRight 0.2s linear 0s 1 both;
    .expand{
      position: absolute;
      right: -10px;
      top: 50%;
      margin-top: -15px;
      font-size: 30px;
      opacity: 1;
      z-index: 2;
      animation: movingBlock 0.2s linear 0s 1 both;
    }
    .shrink{
      position: absolute;
      right: -15px;
      top: 50%;
      margin-top: -15px;
      font-size: 30px;
      opacity: 0;
      z-index: 1;
      animation: movingNone 0.2s linear 0s 1 both;
    }
    .side-menu{
      /deep/ .sides{
        background: transparent;
        .ivu-menu-item-group{
          ul{
            .ivu-menu-item{
              &:hover{
                background: transparent;
              }
            }
            .ivu-menu-item-active{
              background: transparent;
              color: #FFF;
            }
          }
        }
      }
    }
  }
  .theme1{
    background: #56324e;
    @include sideBg(#7a4d7b)
  }
  .theme2{
    background: #00978b;
    @include sideBg(#155d56)
    // @include background(#00978b, #75e9df);
  }
  .theme3{
    background: #3264fb;
    @include sideBg(#2d8cf0)
    // @include background(#3264fb, #6ac7ff);
  }
  .theme4{
    background: #26282e;
    @include sideBg(#363a47)
    // @include background(#26282e, #546697);
  }
  .change{
    animation: movingLeft 0.2s linear 0s 1 forwards;
    .expand{
      animation: movingNone 0.2s linear 0s 1 both;
    }
    .shrink{
      animation: movingBlock 0.2s linear 0s 1 both;
    }
  }
}

.main-content{
  height: calc(100vh - 100px); // sass计算属性  同 stylus
  overflow: auto;
  overflow-x: hidden;
}

.layout-content{
  width: 100%;
}
</style>