<template>
  <div class="order-pay">
    <div class="nav-header">
      <div class="container">
        <div class="main-title">订单支付</div>
      </div>
    </div>
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>
    <ServiceBar></ServiceBar>
  </div>
</template>
<script>
import OrderHeader from "@/components/front/OrderHeader.vue";
import ServiceBar from "@/components/front/ServiceBar.vue";
import Loading from "@/components/front/Loading";
export default {
  name: "order-pay",
  components: {
    OrderHeader,
    ServiceBar,
    Loading,
  },
  data() {
    return {
      loading: true,
      orderId: this.$route.query.orderId,
      content: "",
    };
  },
  mounted() {
    this.paySubmit();
  },
  directives: {}, //设置一个infiniteScroll指令，之后就可以v-infinite-scroll进行使用了
  methods: {
    paySubmit() {
      // this.axios
      //   .post("/pay", {
      //     orderId: this.orderId,
      //     orderName: "vue仿小米商城",
      //     amount: 0.01,
      //     payType: 1,
      //   })
      //   .then((res) => {
      //     this.content = res.content;
      //     setTimeout(() => {
      //       document.forms[0].submit();
      //     }, 100);
      //   });

      const res = {
        status: 0,
        data: {
          content:
            '<form id=\'bestPayForm\' name="punchout_form" method="post" action="https://openapi.alipay.com//gateway.do?charset=utf-8&method=alipay.trade.page.pay&sign=qJMb8d2bO%2FRs85gntUMSrL0rM76rGkRkwNyzMGEGBBjWS2szklT3Q2qUmVigxQ8lkT4lN9hf57hR3%2F%2FvPkBNgRDCkfO0G2xrHWxpYzbXdZlu0ThW10oNm%2BU5kXZcdQ8ihZ4l9MCNRjr9bZvXa8WUvldOdANogD%2FQfLHwujr5%2FzE4AGRC7wgbIi3ofQs6INpuGNhDaw%2BngSp3HUknZ03zfmQCxgya759vK0xZU3jBtIFNmqORwrSUo48pXodhCDqbYr8t2GQv97qV7gY5%2F92MtPxNDbAUO3ah2EdUx%2FWjujsH0S2A92jwOEQDcLvNfC52qO4%2BH6agfswT9xvpq0vS%2Fg%3D%3D&return_url=http%3A%2F%2Fmi.futurefe.com%2F%23%2Forder%2Flist&notify_url=http%3A%2F%2Fmall-pre.springboot.cn%2Fpay%2Fnotify&app_id=2018062960540016&sign_type=RSA2&version=1.0&timestamp=2023-04-02+15%3A39%3A27">\n<input type="hidden" name="biz_content" value="{&quot;out_trade_no&quot;:&quot;1680419141273&quot;,&quot;total_amount&quot;:&quot;0.01&quot;,&quot;subject&quot;:&quot;vue仿小米商城&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;}">\n<input type="submit" value="立即支付" style="display:none" >\n</form>',
        },
      };
      res.data.content += `\n<script>document.getElementById('bestPayForm').submit();`;
      res.data.content += `</scri`;
      res.data.content += `pt>`;
      this.content = res.data.content;
      setTimeout(() => {
        document.forms[0].submit();
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/reset.scss";
@import "../../../assets/scss/mixin.scss";
@import "../../../assets/scss/config.scss";
@import "view-ui-plus/dist/styles/viewuiplus.css";
.order-pay {
  width: 1226px;
  margin: 0 auto;
}
.nav-header {
  .container {
    @include flex();
    position: relative;
    height: 112px;
    width: 1226px;
    margin: 0 auto;
    .main-title {
      // font-weight: bold;
      font-size: 30px;
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