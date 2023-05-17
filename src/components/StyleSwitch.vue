<!-- 主题颜色切换器 -->
<template>
  <div class="cdp-switch" :style="styleSheet">
    <Dropdown trigger="click" @on-click="switchChange">
      <div class="paleColor" title="主题配色">
        <Icon type="ios-color-palette" />
      </div>
      <template #list>
        <DropdownMenu class="ownSize">
          <DropdownItem name="1">
            <span class="sp1">
              <Icon style="color: #56324e" type="md-image" />
            </span>
            <span class="sp2">魅惑紫</span>
          </DropdownItem>
          <DropdownItem name="2">
            <span class="sp1">
              <Icon style="color: #00978b" type="md-image" />
            </span>
            <span class="sp2">清新绿</span>
          </DropdownItem>
          <DropdownItem name="3">
            <span class="sp1">
              <Icon style="color: #008ce6" type="md-image" />
            </span>
            <span class="sp2">优雅蓝</span>
          </DropdownItem>
          <DropdownItem name="4">
            <span class="sp1">
              <Icon style="color: #26282e" type="md-image" />
            </span>
            <span class="sp2">经典黑</span>
          </DropdownItem>
        </DropdownMenu>
      </template>
    </Dropdown>
  </div>
</template>

<script>
export default {
  props: {
    styleSheet: {
      type: Object,
      default: function () {
        return {
          position: "fixed",
          right: "190px",
          width: "40px",
          height: "40px",
          top: "10px",
          color: "#fff",
          zIndex: "1000",
        };
      },
    },
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    // 更换主题
    switchChange(status) {
      localStorage.setItem("themeColor", "theme" + status);
      this.$emit("changeStyle", "theme" + status);
    },
  },
  mounted() {},
  created() {},
};
</script>

<style scoped lang="less">
.cdp-switch {
  .paleColor {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>