<template>
  <div class="order-pay">
    <div class="nav-header">
      <div class="container">
        <div class="main-title">订单支付</div>
      </div>
    </div>
    <Card>
      <div class="order-wrap">
        <div class="item-order">
          <div class="icon-succ"></div>
          <div class="order-info">
            <h2>订单提交成功！去付款咯～</h2>
            <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
            <p>收货信息：{{ addressInfo }}</p>
          </div>
          <div class="order-total">
            <p>
              应付总额：<span>{{ payment }}</span
              >元
            </p>
            <p>
              订单详情<em
                class="icon-down"
                :class="{ up: showDetail }"
                @click="showDetail = !showDetail"
              ></em>
            </p>
          </div>
        </div>
        <div class="item-detail" v-if="showDetail">
          <div class="item">
            <div class="detail-title">订单号：</div>
            <div class="detail-info theme-color">{{ orderId }}</div>
          </div>
          <div class="item">
            <div class="detail-title">收货信息：</div>
            <div class="detail-info">{{ addressInfo }}</div>
          </div>
          <div class="item good">
            <div class="detail-title">商品名称：</div>
            <div class="detail-info">
              <ul>
                <li v-for="(item, index) in orderDetail" :key="index">
                  <img v-lazy="item.productImage" />{{ item.productName }}
                </li>
              </ul>
            </div>
          </div>
          <div class="item">
            <div class="detail-title">发票信息：</div>
            <div class="detail-info">电子发票 个人</div>
          </div>
        </div>
      </div>
      <div class="item-pay">
        <h3>选择以下支付方式付款</h3>
        <div class="pay-way">
          <p>支付平台</p>
          <div
            class="pay pay-ali"
            :class="{ checked: payType == 1 }"
            @click="paySubmit(1)"
          ></div>
          <div
            class="pay pay-wechat"
            :class="{ checked: payType == 2 }"
            @click="paySubmit(2)"
          ></div>
        </div>
      </div>
    </Card>

    <scan-pay-code
      v-if="showPay"
      :img="payImg"
      @close="closePayModal"
    ></scan-pay-code>
    <modal
      title="支付确认"
      btnType="3"
      sureText="已支付，查看订单"
      cancelText="未支付"
      :showModal="showPayModal"
      @cancel="showPayModal = false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
    </modal>
    <ServiceBar></ServiceBar>
  </div>
</template>
<script>
import QRCode from "qrcode";
import OrderHeader from "@/components/front/OrderHeader.vue";
import ServiceBar from "@/components/front/ServiceBar.vue";
import ScanPayCode from "@/components/front/ScanPayCode";
import Modal from "@/components/front/Modal";
export default {
  name: "order-pay",
  components: {
    OrderHeader,
    ServiceBar,
    ScanPayCode,
    Modal,
  },
  data() {
    return {
      orderId: this.$route.query.orderNo,
      addressInfo: "", //地址详情
      orderDetail: [], //订单详情
      showDetail: false,
      payType: "", //支付类型
      showPay: false, //控制微信支付页面
      payImg: "", //微信支付的二维码地址
      payment: 0, //订单总金额
      showPayModal: false, //控制模态框
      T: "", //定时器id
    };
  },
  mounted() {
    // this.getOrderDetail();
  },
  directives: {}, //设置一个infiniteScroll指令，之后就可以v-infinite-scroll进行使用了
  methods: {
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderId}`).then((res) => {
        let item = res.shippingVo;
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
        this.orderDetail = res.orderItemVoList;
        this.payment = res.payment;
      });
    },
    goOrderList() {
      this.$router.push("/order/list");
    },
    closePayModal() {
      this.showPay = false;
      this.showPayModal = true;
      clearInterval(this.T);
    },
    paySubmit(payType) {
      if (payType == 1) {
        window.open("/#/orderAlipay?orderId=" + this.orderId, "_blank");
      } else {
        const res = {
          status: 0,
          data: { content: "weixin://wxpay/bizpayurl?pr=ePem2xkzz" },
        };
        QRCode.toDataURL(res.data.content)
          .then((url) => {
            this.showPay = true;
            this.payImg = url;
            this.loopOrderState();
          })
          .catch(() => {
            this.$message.error("微信二维码生成失败，请稍后重试");
          });

        // this.axios
        //   .post("/pay", {
        //     orderId: this.orderId,
        //     orderName: "vue仿小米商城",
        //     amount: 0.01,
        //     payType: 2,
        //   })
        //   .then((res) => {
        //     QRCode.toDataURL(res.content)
        //       .then((url) => {
        //         this.showPay = true;
        //         this.payImg = url;
        //         this.loopOrderState();
        //       })
        //       .catch(() => {
        //         this.$message.error("微信二维码生成失败，请稍后重试");
        //       });
        //   });
      }
    },
    loopOrderState() {
      this.T = setInterval(() => {
        // this.axios.get(`/orders/${this.orderId}`).then((res) => {
        //   if (res.status == 20) {
        //     clearInterval(this.T);
        //     this.goOrderList();
        //   }
        // });
      }, 1000);
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

.order-pay {
  .order-wrap {
    padding: 62px 50px;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 30px;
    .item-order {
      display: flex;
      align-items: center;
      .icon-succ {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: url("@/assets/imgs/icon-gou.png") #80c58a no-repeat center;
        background-size: 60px;
        margin-right: 40px;
      }
      .order-info {
        margin-right: 248px;
        h2 {
          font-size: 24px;
          color: #333333;
          margin-bottom: 20px;
        }
        p {
          color: #666666;
          span {
            color: #ff6700;
          }
        }
      }
      .order-total {
        & > p:first-child {
          margin-bottom: 30px;
        }
        span {
          font-size: 28px;
          color: #ff6700;
        }
        .icon-down {
          display: inline-block;
          width: 14px;
          height: 10px;
          background: url("@/assets/imgs/icon-down.png") no-repeat center;
          background-size: contain;
          margin-left: 9px;
          transition: all 0.5s;
          cursor: pointer;
          &.up {
            transform: rotate(180deg);
          }
        }
        .icon-up {
          transform: rotate(180deg);
        }
      }
    }
    .item-detail {
      border-top: 1px solid #d7d7d7;
      padding-top: 47px;
      padding-left: 130px;
      font-size: 14px;
      margin-top: 45px;
      .item {
        margin-bottom: 19px;
        .detail-title {
          float: left;
          width: 100px;
        }
        .detail-info {
          display: inline-block;
          img {
            width: 30px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .item-pay {
    padding: 26px 50px 72px;
    background-color: #ffffff;
    color: #333333;
    h3 {
      font-size: 20px;
      font-weight: 200;
      color: #333333;
      padding-bottom: 24px;
      border-bottom: 1px solid #d7d7d7;
      margin-bottom: 26px;
    }
    .pay-way {
      font-size: 18px;
      .pay {
        display: inline-block;
        width: 188px;
        height: 64px;
        border: 1px solid #d7d7d7;
        cursor: pointer;
        &:last-child {
          margin-left: 20px;
        }
        &.checked {
          border: 1px solid #ff6700;
        }
      }
      .pay-ali {
        background: url("@/assets/imgs/pay/icon-ali.png") no-repeat center;
        background-size: 103px 38px;
        margin-top: 19px;
      }
      .pay-wechat {
        background: url("@/assets/imgs/pay/icon-wechat.png") no-repeat center;
        background-size: 103px 38px;
      }
    }
  }
}
</style>