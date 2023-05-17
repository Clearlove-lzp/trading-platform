<template>
  <div>
    <nav-header :isLogin="isLogin"></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/front/NavHeader.vue";
import NavFooter from "@/components/front/NavFooter.vue";
import { loginUserDataGet } from "@/api/index";
import { mapMutations } from "vuex";

export default {
  name: "nav-home",
  components: {
    NavHeader,
    NavFooter,
  },
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    ...mapMutations("user", ["setUserInfo"]),
    getLoginInfo() {
      loginUserDataGet().then((res) => {
        if (res.data.code === 1) {
          this.setUserInfo(res.data.data);
          this.isLogin = true;
        } else {
          this.isLogin = false;
          this.$Message.error(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.getLoginInfo();
  },
};
</script>

<style lang="scss">
</style>