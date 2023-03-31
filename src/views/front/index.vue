<template>
  <div>
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/front/NavHeader.vue";
import NavFooter from "@/components/front/NavFooter.vue";

export default {
  name: "nav-home",
  components: {
    NavHeader,
    NavFooter,
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/reset.scss";
@import "../../assets/scss/config.scss";
@import "../../assets/scss/button.scss";
</style>