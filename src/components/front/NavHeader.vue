<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <router-link to="/index">xxx数据交易平台</router-link>
          <router-link to="">数据产品</router-link>
          <router-link to="">数据服务</router-link>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="javascript:;">会员中心</a>
          <a href="/#/orderlist">我的订单</a>
          <a href="javascript:;">在线客服</a>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;" class="my-cart" @click="gotoCart"
            ><span class="icon-cart"></span>购物车({{ cartCount }})</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "nav-header", //home直接引用的nav-header标签，与这个名字无关，与NavHeader.vue这个名字有关
  data() {
    return {
      phoneList: [],
    };
  },
  computed: {
    username() {
      // return this.$store.state.username;
    },
    cartCount() {
      // return this.$store.state.cartCount;
    },
    ...mapState(["username", "cartCount"]),
  },
  mounted() {
    // this.getProductList();
    let params = this.$route.params;
    if (params && params.from == "login") {
      // this.getCartCount();
    }
  },
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return "￥" + val.toFixed(2) + "元";
    },
  },
  methods: {
    getProductList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012",
            pageSize: 6,
            //传六组数据
          }, //用get方法时需要用params传递参数，若用post则不需要用params
        })
        .then((res) => {
          this.phoneList = res.list;
        });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = 0) => {
        this.$store.dispatch("saveCartCount", res);
      });
    },
    gotoCart() {
      this.$router.push("/shoppingCart");
    },
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.axios.post("/user/logout").then(() => {
        this.$message.success("退出成功");
        this.$cookie.set("userId", "", { expires: "-1" });
        this.$store.dispatch("saveUserName", "");
        this.$store.dispatch("saveCartCount", "0");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/reset.scss";
@import "../../assets/scss/base.scss";
@import "../../assets/scss/mixin.scss";
@import "../../assets/scss/config.scss";
@import "view-ui-plus/dist/styles/viewuiplus.css";
.header {
  font-size: 12px;
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: $colorB;
    .container {
      @include flex();
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: $colorA;
        text-align: center;
        color: #ffffff;
        margin-right: 0;
      }
      .icon-cart {
        display: inline-block;
        width: 16px;
        height: 12px;
        background: url("@/assets/imgs/icon-cart-checked.png") no-repeat center;
        background-size: contain;
        margin-right: 4px;
      }
    }
  }
}
</style>