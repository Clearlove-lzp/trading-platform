/*
 * @Author: 刘志鹏 
 * @Date: 2019-06-26 18:01:23 
 * @Last Modified by: 刘志鹏
 * @Last Modified time: 2019-07-09 14:13:47
 */
<!-- 顶部菜单栏B -->
<template>
  <Menu ref="topMenu" mode="horizontal" :active-name="activeName" theme="primary" width="auto">
    <template v-for="(item, index) in routes">
      <template v-if="item.children && item.children.length > 0">
        <Menu-item :name="`${item.path}`" :key="index" :to="`${item.redirect}`">
          <Icon :type="item.Icon"></Icon>
          {{item.name}}
        </Menu-item>
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
  props: ['routes', 'activeName'],
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {},
  mounted() {},
  created() {},
  watch: {
  }
}
</script>

<style scoped lang="less"> 
.ivu-menu{
  color: #fff;
  background: transparent;
}
// ----------------- 导航条hover&active颜色 -----------------

/deep/ .ivu-menu-submenu:hover {
  background: rgba(0, 0, 0, 0.2) !important;
  color: #fff !important;
}
/deep/ .ivu-menu-item-active {
  background: rgba(0, 0, 0, 0.2) !important;
  color: #fff !important;
  &:hover {
    background: rgba(0, 0, 0, 0.2) !important;
    color: #fff !important;
  }
}
/deep/ .ivu-menu-item:hover {
  background: rgba(0, 0, 0, 0.2) !important;
  color: #fff !important;
}
</style>