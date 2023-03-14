<!-- 全屏组件 -->
<template>
  <div v-if="showFullScreenBtn" class="full-screen-btn-con" :style="styleSheet">
    <Tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
      <Icon @click.native="handleChange" :type="isFullscreen ? 'md-contract' : 'md-expand'" :size="23"></Icon>
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: 'Fullscreen',
  data() {
    return {
      isFullscreen: false,
    };
  },
  computed: {
    showFullScreenBtn () {
      return window.navigator.userAgent.indexOf('MSIE') < 0
    }
  },
  props: {
    styleSheet: {
      type: Object,
      default: function () {
        return {
          position: 'fixed',
          width: '40px',
          right: '110px',
          height: '40px;',
          top: '2px',
          color: '#fff',
          zIndex: 1000
        }
      }
    }
  },
  methods: {
    handleFullscreen () {
      let main = document.body
      if (this.isFullscreen) {
        // 关闭全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
        this.isFullscreen = false;
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
        this.isFullscreen = true;
      }
    },
    handleChange () {
      this.handleFullscreen()
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.full-screen-btn-con .ivu-tooltip-rel{
  height: 64px;
  line-height: 56px;
  i{
    cursor: pointer;
  }
}
</style>
