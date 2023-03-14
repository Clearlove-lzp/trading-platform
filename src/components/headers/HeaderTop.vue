<!--
 * @Description: 顶部导航样式
 * @Date: 2019-05-23 09:51:28
 * @Author: YangChao
 * @LastEditTime: 2019-05-27 17:53:37
 -->
<template>
  <div class="head-v3">
    <div id="themenu" class="theme1">
      <div class="NavItem">
        <img src="../../assets/logo-login-mobile.png" class="home-class">
        <div class="NavLine"></div>
        <h2 class="NavTitml">浙江集中调度平台</h2>
      </div>
      <div class="navigation-up">
        <div class="navigation-inner">
          <div class="navigation-v3">
            <ul>
              <!-- <li class="nav-up-selected-inpage" _t_nav="home">
                <h2>
                  <a>首页</a>
                </h2>
              </li> -->
              <li _t_nav="product">
                <h2>
                  <a>割接管理</a>
                </h2>
              </li>
              <!-- <li _t_nav="wechat">
                <h2>
                  <a>故障调度</a>
                </h2>
              </li>
              <li _t_nav="solution">
                <h2>
                  <a>保障管理</a>
                </h2>
              </li> -->
              <!-- <li _t_nav="cooperate">
                <h2>
                  <a>突发事件管理</a>
                </h2>
              </li> -->
              <li _t_nav="cooperate">
                <h2>
                  <a>系统管理</a>
                </h2>
              </li>
              <li _t_nav="information">
                <h2>
                  <a>信息管理</a>
                </h2>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="navigation-down">
        <div id="product" class="nav-down-menu menu-1" style="display: none;" _t_nav="product">
          <div class="navigation-down-inner">
            <dl style="margin-left: 200px;">
              <dt>工单管控</dt>
              <dd>
                <router-link to="/Basic/cutPlan">工单管理</router-link>
              </dd>
              <dd>
                <router-link to="/Basic/cutTask">任务管理</router-link>
              </dd>
              <dd>
                <router-link to="/Basic/cutProject">方案管理</router-link>
              </dd>
            </dl>
            <dl>
              <dt>事前管控</dt>
              <dd>
                <router-link to="/CuttingPage/cutApply">割接申请</router-link>
                <!-- <a>割接申请</a> -->
              </dd>
              <dd>
                <a>割接计划管理</a>
              </dd>
            </dl>
            <dl>
              <dt>事中管控</dt>
              <dd>
                <a>割接视图</a>
              </dd>
              <dd>
                <a>监控视图</a>
              </dd>
            </dl>
            <dl>
              <dt>事后管控</dt>
              <dd>
                <a>割接分析</a>
              </dd>
              <dd>
                <a>历史割接</a>
              </dd>
            </dl>
            <dl>
              <dt>我的割接</dt>
              <dd>
                <a>我的代办</a>
              </dd>
              <dd>
                <a>我的在办</a>
              </dd>
              <dd>
                <a>我的已办</a>
              </dd>
            </dl>
          </div>
        </div>
        <div id="solution" class="nav-down-menu menu-3 menu-1" style="display: none;" _t_nav="solution">
          <div class="navigation-down-inner">
            <dl style="margin-left: 380px;">
              <dd>
                <a class="link">指标管理</a>
              </dd>
            </dl>
            <dl>
              <dd>
                <a class="link">指标模板管理</a>
              </dd>
            </dl>
            <dl>
              <dd>
                <a class="link">割接申请模板管理</a>
              </dd>
            </dl>
            <dl>
              <dd>
                <a class="link">流程模板管理</a>
              </dd>
            </dl>
          </div>
        </div>
        <div id="cooperate" class="nav-down-menu menu-1" style="display: none;" _t_nav="cooperate">
          <div class="navigation-down-inner">
            <dl style="margin-left: 480px;">
              <dt>权限管理</dt>
              <dd>
                <router-link to="/system/baseInfo">用户信息管理</router-link>
                <!-- <a>用户信息管理</a> -->
              </dd>
              <dd>
                <router-link to="/system/userRole">角色信息管理</router-link>
                <!-- <a>角色信息管理</a> -->
              </dd>
              <dd>
                <router-link to="/system/menuView">菜单管理</router-link>
                <!-- <a>菜单管理</a> -->
              </dd>
            </dl>
            <dl>
              <dt>日志管理</dt>
              <dd>
                <router-link to="/system/logs">操作日志</router-link>
                <!-- <a>操作日志</a> -->
              </dd>
              <dd>
                <router-link to="/system/login/logs">登录日志</router-link>
                <!-- <a>登录日志</a> -->
              </dd>
            </dl>
            <dl>
              <dt>系统管理</dt>
              <dd>
                <router-link to="/system/deptBaseInfo">部门管理</router-link>
                <!-- <a>部门管理</a> -->
              </dd>
              <dd>
                <router-link to="/system/dictionary">字典管理</router-link>
                <!-- <a>字典管理</a> -->
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="cdp-switch">
        <Dropdown trigger="click" @on-click="switchChange">
          <div class="paleColor" title="主题配色">
            <Icon type="ios-color-palette" />
          </div>
          <DropdownMenu slot="list" class="ownSize">
            <DropdownItem name="1">
              <span class="sp1">
                <Icon style="color: #56324e;" type="md-image" />
              </span>
              <span class="sp2">魅惑紫</span>
            </DropdownItem>
            <DropdownItem name="2">
              <span class="sp1">
                <Icon style="color: #00978b;" type="md-image" />
              </span>
              <span class="sp2">清新绿</span>
            </DropdownItem>
            <DropdownItem name="3">
              <span class="sp1">
                <Icon style="color: #008ce6;" type="md-image" />
              </span>
              <span class="sp2">优雅蓝</span>
            </DropdownItem>
            <DropdownItem name="4">
              <span class="sp1">
                <Icon style="color: #26282e;" type="md-image" />
              </span>
              <span class="sp2">经典黑</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="changeLayOut" @click="changeLayOut" title="切换">
        <Icon type="md-repeat" />
      </div>
    </div>
    <div class="path-link">
      <Breadcrumb class="Bread-Crumb">
        <BreadcrumbItem v-for="matched in $route.matched" :key="matched.path">{{matched.name}}</BreadcrumbItem>
      </Breadcrumb>
      <Icon @click="$router.back()" class="icon-btn" size="38" type="md-arrow-back"></Icon>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      theme1: "primary",
    };
  },
  methods: {
    // 切换布局方式
    changeLayOut() {
      let oldLayOut = 'false'
      localStorage.setItem('oldLayOut', oldLayOut)
      setTimeout(() => {
        this.$parent.checkLoyOut()
        this.$parent.localStorageDate()
      }, 200)
    },
    //存储主题颜色
    localStorageDate() {
      let memoryColor = localStorage.getItem("themeColor");
      let params = document.getElementById("themenu");
      params.className = memoryColor;
    },
    // 更换主题
    switchChange(status) {
      let params = document.getElementById("themenu");
      params.className = "theme" + status;
      localStorage.setItem(
        "themeColor",
        params.className
      );
    },
    // 导航动画效果
    animateTop() {
      jQuery(document).ready(function() {
        var qcloud = {};
        $("[_t_nav]").hover(
          function() {
            var _nav = $(this).attr("_t_nav");
            clearTimeout(qcloud[_nav + "_timer"]);
            qcloud[_nav + "_timer"] = setTimeout(function() {
              $("[_t_nav]").each(function() {
                $(this)[
                  _nav == $(this).attr("_t_nav") ? "addClass" : "removeClass"
                ]("nav-up-selected");
              });
              $("#" + _nav)
                .stop(true, true)
                .slideDown(200);
            }, 150);
          },
          function() {
            var _nav = $(this).attr("_t_nav");
            clearTimeout(qcloud[_nav + "_timer"]);
            qcloud[_nav + "_timer"] = setTimeout(function() {
              $("[_t_nav]").removeClass("nav-up-selected");
              $("#" + _nav)
                .stop(true, true)
                .slideUp(200);
            }, 150);
          }
        );
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.localStorageDate();
      this.animateTop();
    })
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

li {
  list-style: none;
}
a:link,
a:visited {
  text-decoration: none;
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
.navigation-up .navigation-v3 {
  margin-left: 40px;
  float: left;
}
.navigation-up .navigation-v3 ul {
  float: left;
}
.navigation-up .navigation-v3 li {
  float: left;
  font: normal 16px/59px "microsoft yahei";
  color: #fff;
}
.navigation-up .navigation-v3 .nav-up-selected {
  background: #344157;
}
.navigation-up .navigation-v3 .nav-up-selected-inpage {
  background: #202833;
}
.navigation-up .navigation-v3 li h2 {
  font-weight: normal;
  padding: 0;
  margin: 0;
}
.navigation-up .navigation-v3 li h2 a {
  padding: 0 25px;
  color: #fff;
  display: inline-block;
  height: 56px;
  font-family: "microsoft yahei";
  font-size: 16px;
}

.navigation-down {
  position: absolute;
  top: 60px;
  left: 0px;
  width: 100%;
  z-index: 10000
}
.navigation-down .nav-down-menu {
  width: 100%;
  margin: 0;
  // background: #344157;
  @include background(#26282e, #546697);
  position: absolute;
  top: 0px;
}
.navigation-down .nav-down-menu .navigation-down-inner {
  margin: auto;
  width: 1200px;
  position: relative;
}
.navigation-down .nav-down-menu dl {
  float: left;
  margin: 18px 80px 18px 0;
}
.navigation-down .menu-1 dl {
  margin: 20px 80px 25px 0;
}
.navigation-down .menu-1 dt {
  font: normal 16px "microsoft yahei";
  color: #61789e;
  padding-bottom: 10px;
  border-bottom: 1px solid #61789e;
  margin-bottom: 10px;
}
.navigation-down .menu-1 dd a {
  color: #fff;
  font: normal 14px/30px "microsoft yahei";
}
.navigation-down .menu-1 dd a:hover {
  color: #60aff6;
}
.navigation-down .menu-2 dd a,
.navigation-down .menu-3 dd a {
  color: #fff;
  font: normal 16px "microsoft yahei";
}

.NavItem {
  display: inline-flex;
  float: left;
  margin-right: 5px;
  .home-class {
    height: 57px;
    margin-right: 5px;
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
.changeLayOut{
  position: fixed;
  right: 100px;
  width: 40px;
  height: 40px;
  top: 10px;
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  cursor: pointer;
}
.cdp-switch {
  position: fixed;
  right: 210px;
  width: 40px;
  height: 40px;
  top: 10px;
  color: #fff;
  .paleColor {
    font-size: 24px;
    cursor: pointer;
  }
}
.theme1 {
  .navigation-up {
    @include background(#56324e, #b35782);
    .navigation-v3 {
      .nav-up-selected-inpage {
        background: #56324e;
      }
      .nav-up-selected {
        background: #56324e;
      }
    }
  }
  .navigation-down {
    .nav-down-menu {
      @include background(#56324e, #b35782);
    }
  }
}
.theme2 {
  .navigation-up {
    @include background(#00978b, #75e9df);
    .navigation-v3 {
      .nav-up-selected-inpage {
        background: #00978b;
      }
      .nav-up-selected {
        background: #00978b;
      }
    }
  }
  .navigation-down {
    .nav-down-menu {
      @include background(#00978b, #75e9df);
    }
  }
}
.theme3 {
  .navigation-up {
    @include background(#3264fb, #6ac7ff);
    .navigation-v3 {
      .nav-up-selected-inpage {
        background: #3264fb;
      }
      .nav-up-selected {
        background: #3264fb;
      }
    }
  }
  .navigation-down {
    .nav-down-menu {
      @include background(#3264fb, #6ac7ff);
    }
  }
}
.theme4 {
  .navigation-up {
    @include background(#26282e, #546697);
    .navigation-v3 {
      .nav-up-selected-inpage {
        background: #26282e;
      }
      .nav-up-selected {
        background: #26282e;
      }
    }
  }
  .navigation-down {
    .nav-down-menu {
      @include background(#26282e, #546697);
    }
  }
}

/deep/ .ivu-select-dropdown {
  z-index: 100
}

.path-link {
    // top: 60px;
    position: relative;
    z-index: -1;
    width: 100%;
    .Bread-Crumb {
      background-color: white;
      padding: 10px;
    }
    .icon-btn {
      position: absolute;
      border: 1px solid #efefef;
      width: 38px;
      height: 38px;
      margin-top: 1px;
      text-align: center;
      -webkit-border-radius: 50px;
      -moz-border-radius: 50px;
      border-radius: 50px;
      right: 40px;
      top: 0;
      cursor: pointer;
      color: #afafaf;
      &:hover {
        color: #2d8cf0;
        box-shadow: 0 0 10px 0 #727574;
      }
    }
  }
</style>
