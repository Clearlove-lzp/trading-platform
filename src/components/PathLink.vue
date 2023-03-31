<!-- 面包屑组件 -->
<template>
  <div class="path-link">
    <Breadcrumb class="Bread-Crumb">
      <BreadcrumbItem v-for="matched in $route.matched" :key="matched.path">{{
        matched.name
      }}</BreadcrumbItem>
    </Breadcrumb>
    <Icon
      @click="$router.back()"
      class="icon-btn"
      size="38"
      type="md-arrow-back"
    ></Icon>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
  mounted() {},
  created() {},
};
</script>

<style scoped lang="less">
.path-link {
  // top: 60px;
  position: relative;
  // z-index: 5;
  width: 100%;
  height: 40px;
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