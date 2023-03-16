<!-- 顶部菜单栏A -->
<template>
  <Menu ref="topMenu" mode="horizontal" :active-name="activeName" theme="primary" width="auto">
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
}
</script>

<style scoped lang="less"> 
.ivu-menu{
  color: #fff;
  background: transparent;
}
// ----------------- 导航条hover&active颜色 -----------------

:deep(.ivu-menu-submenu:hover) {
  background: rgba(0, 0, 0, 0.2) !important;
  color: #fff !important;
}
:deep(.ivu-menu-item-active) {
  background: rgba(0, 0, 0, 0.2) !important;
  color: #fff !important;
  &:hover {
    background: rgba(0, 0, 0, 0.2) !important;
    color: #fff !important;
  }
}
:deep(.ivu-menu-item:hover){
  background: rgba(0, 0, 0, 0.2) !important;
  color: #fff !important;
}
</style>