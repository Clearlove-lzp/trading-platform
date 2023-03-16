<!-- 收缩左边栏 -->
<template>
  <div class="menu-collapsed" :list="routes">
    <div class="logo-con">
      <img :src="require('../../assets/logo-login.png')" key="min-logo">
    </div>
    <template v-for="(item, index) in routes" :key="index">
      <Dropdown
        v-if="item.children && item.children.length > 0"
        ref="dropdown"
        placement="right-start"
        @on-click="handleClickUserDropdown"
      >
        <a class="drop-menu-a" type="text">
          <Icon :type="item.Icon" style="color: #FFF" :size="24"/>
        </a>
        <template #list>
          <DropdownMenu ref="dropdown">
            <template v-for="(child, i) in item.children" :key="i">
              <DropdownItem :name="`${item.path}/${child.path}`">{{child.name}}</DropdownItem>
            </template>
          </DropdownMenu>
        </template>
      </Dropdown>
      <Tooltip transfer v-else :content="item.name" placement="right">
        <a
          class="drop-menu-a"
          @click="$router.push({path: item.path})"
          :style="{textAlign: 'center'}"
        >
          <Icon :type="item.Icon" style="color: #FFF" :size="24"/>
        </a>
      </Tooltip>
    </template>
  </div>
</template>

<script>
export default {
  props: ['routes'],
  data() {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {
    // 点击跳转
    handleClickUserDropdown(name) {
      this.$router.push(name);
    }
  },
  mounted() {},
  created() {}
};
</script>

<style scoped lang="scss">
.menu-collapsed {
  // padding-top: 10px;

  .ivu-dropdown {
    // width: 100%;
    .ivu-dropdown-rel a {
      width: 78px;
    }
    .ivu-select-dropdown {
      width: 100%;
    }
  }
  .ivu-tooltip {
    width: 100%;
    .ivu-tooltip-rel {
      width: 100%;
    }
    .ivu-tooltip-popper .ivu-tooltip-content {
      .ivu-tooltip-arrow {
        border-right-color: #fff;
      }
      .ivu-tooltip-inner {
        background: #fff;
        color: #495060;
      }
    }
  }
}

.logo-con {
  height: 64px;
  padding: 10px;
  img {
    height: 44px;
    width: auto;
    display: block;
    margin: 0 auto;
  }
}

a.drop-menu-a {
  display: inline-block;
  padding: 6px 15px;
  width: 100%;
  text-align: center;
  color: #495060;
}
</style>