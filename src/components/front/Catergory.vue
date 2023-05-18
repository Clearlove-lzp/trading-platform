<template>
  <div class="nav-header">
    <div class="container">
      <div class="header-logo">
        <a href="/index"></a>
      </div>
      <div class="header-menu">
        <div class="item-menu">
          <span @click="toTypePage('/structuredData')">结构化数据</span>
        </div>
        <div class="item-menu">
          <span @click="toTypePage('/imgData')">图片数据</span>
        </div>
        <div class="item-menu">
          <span @click="toTypePage('/textData')">文本数据</span>
        </div>
        <div class="item-menu">
          <span @click="toTypePage('/videoData')">视频数据</span>
        </div>
        <div class="item-menu">
          <span @click="toTypePage('/radioData')">音频数据</span>
        </div>
        <div class="item-menu">
          <span @click="toTypePage('/otherData')">其他</span>
        </div>
      </div>
      <div class="header-search">
        <div class="wrapper">
          <input type="text" name="keyword" />
          <a href="javascript:;"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    toTypePage(path) {
      this.$router.push(path);
    },
  },
  watch: {},
  mounted() {},
  created() {},
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/reset.scss";
@import "../../assets/scss/mixin.scss";
@import "../../assets/scss/config.scss";
.nav-header {
  .container {
    @include flex();
    position: relative;
    height: 112px;
    width: 1226px;
    margin: 0 auto;
    .header-menu {
      padding-left: 209px;
      .item-menu {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        line-height: 112px;
        margin-right: 20px;
        span {
          cursor: pointer;
        }
        &:hover {
          color: $colorA;
          .children {
            height: 220px;
            opacity: 1;
          }
        }
        .children {
          border-top: 1px solid #e5e5e5;
          z-index: 10;
          position: absolute;
          top: 112px;
          left: 0;
          width: 1226px;
          height: 0px;
          opacity: 0;
          overflow: hidden;
          transition: all 0.5s;
          background-color: $colorG;
          box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
          a {
            display: inline-block;
          }
          .product {
            position: relative;
            float: left;
            width: 16.6%;
            text-align: center;
            font-size: 12px;
            line-height: 12px;
            &::before {
              position: absolute;
              content: "";
              top: 28px;
              right: 0;
              height: 100px;
              width: 1px;
              border-right: 1px solid $colorF;
            }
            &:last-child::before {
              display: none;
            }
          }
          img {
            margin-top: 26px;
            height: 111px;
            width: auto;
          }
          .pro-img {
            height: 137px;
          }
          .pro-name {
            font-weight: bold;
            color: $colorB;
            margin-top: 19px;
            margin-bottom: 8px;
          }
          .pro-price {
            color: $colorA;
          }
        }
      }
    }
    .header-search {
      width: 319px;
      .wrapper {
        height: 50px;
        border: 1px solid #e0e0e0;
        display: flex;
        align-items: center;
        input {
          border: none;
          box-sizing: border-box;
          border-right: 1px solid #e0e0e0;
          width: 264px;
          height: 48px;
          padding-left: 14px;
        }
        a {
          @include bgImg(18px, 18px, "@/assets/imgs/icon-search.png");
          margin-left: 17px;
        }
      }
    }
  }
}
</style>