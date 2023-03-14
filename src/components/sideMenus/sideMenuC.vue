/*
 * @Author: 刘志鹏 
 * @Date: 2019-06-27 09:30:05 
 * @Last Modified by: 刘志鹏
 * @Last Modified time: 2019-07-02 10:55:57
 */
<!-- 主题三左边菜单 -->
<template>
  <div v-if="!collpase">
    <Menu theme="dark" class="sides" :active-name="activeName" width="auto" v-for="(item, index) in routes" v-if="index === idx" :key="index">
      <MenuGroup title="二级菜单" >
        <template v-if="item.children && item.children.length > 0">
          <MenuItem :name="`${item.path}/${item1.path}`" :to="`${item.path}/${item1.path}`" v-for="(item1, i) in item.children" :key="i">
            <Icon type="md-document" />
            {{item1.name}}
          </MenuItem>
        </template>
      </MenuGroup>
    </Menu>
  </div>
</template>

<script>
export default {
  props: ['collpase', 'routes', 'activeName', 'idx'],
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {
  },
  mounted() {},
  created() {},
}
</script>

<style scoped lang="scss">
// .ivu-menu{
//   color: #fff;
//   background: transparent;
// }
</style>