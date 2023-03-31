<!-- 展开左边栏 -->
<template>
  <Menu ref="sideMenuA" accordion :active-name="activeName" :open-names="openNames" theme="dark" width="auto" :class="menuitemClasses">
    <div class="logo-con">
      <img src="@/assets/imgs/seize_seat.jpg" key="max-logo">
    </div>
    <template v-for="(item, index) in routes">
      <template v-if="item.children && item.children.length > 0">
        <Submenu :name="`${item.path}`" :key="index">
          <template #title>
            <Icon :type="item.Icon"/>
            <span>{{item.name}}</span>
          </template>
          <Menu-item
            v-for="(value, i) in item.children"
            :to="`${item.path}/${value.path}`"
            :name="`${item.path}/${value.path}`"
            :key="i"
          >{{value.name}}</Menu-item>
        </Submenu>
      </template>
      <template v-else>
        <Menu-item :name="`${item.path}`" :key="index" :to="item.path">
          <Icon :type="item.Icon"></Icon>
          {{item.name}}
        </Menu-item>
      </template>
    </template>
  </Menu>
</template>

<script>
export default {
  props: ['routes', 'activeName', 'openNames'],
  data() {
    return {
      isCollapsed: false,
    };
  },
  components: {},
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {},
  mounted() {},
  created() {},
  watch: {
    openNames() {
      this.$nextTick(() => {
        this.$refs.sideMenuA.updateOpened()
      })
    }
  }
};
</script>

<style scoped lang="scss">
.logo-con {
  height: 64px;
  padding: 10px;
  img {
    height: 44px;
    width: auto;
    display: block;
    // margin: 0 auto;
  }
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
</style>