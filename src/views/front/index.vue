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
import { loginUserDataGet } from "@/api/index";
import { mapMutations } from "vuex";

export default {
  name: "nav-home",
  components: {
    NavHeader,
    NavFooter,
  },
  methods: {
    ...mapMutations("user", ["setUserInfo"]),
    getLoginInfo() {
      loginUserDataGet().then((res) => {
        if (res.data.code === 1) {
          this.setUserInfo(res.data.data);
        } else {
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