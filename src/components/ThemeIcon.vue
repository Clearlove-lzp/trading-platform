<!-- 主题颜色切换按钮 -->
<template>
  <div class="full-screen-btn-con" :style="styleSheet">
    <Tooltip content="主题设置" placement="bottom">
      <Icon type="ios-color-palette" :size="24" @click="clickHandler" />
    </Tooltip>
  </div>
</template>

<script>
export default {
  props: {
    styleSheet: {
      type: Object,
      default: function(){
        return{
          position: 'fixed',
          width: '40px',
          right: '160px',
          height: '40px;',
          top: '2px',
          color: '#fff',
          zIndex: 1000
        }
      }
    }
  },
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {
    clickHandler() {
      this.$emit('showDrawerFunc', true)
    }
  },
  mounted() {},
  created() {},
}
</script>

<style scoped>
</style>