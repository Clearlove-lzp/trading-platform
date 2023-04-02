<template>
  <div class="shopping-cart">
    <div class="nav-header">
      <div class="container">
        <div class="main-title">我的购物车</div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
    <table class="table-order" ref="tableOrder">
      <tr>
        <th class="title-th">
          <Checkbox
            :model-value="productCheckAll"
            @click.prevent="productHandleCheckAll"
          ></Checkbox>
          <span>全选</span>
        </th>
        <th class="title-th">商品</th>
        <th class="title-th">单价</th>
        <th class="title-th">数量</th>
        <th class="title-th">小计</th>
        <th class="title-th">操作</th>
      </tr>
      <template v-for="(x, i) in produltList" :key="i">
        <tr>
          <td class="order-td base-info">{{ x.time }}</td>
          <td class="order-td" colspan="7">订单号：{{ x.orderNo }}</td>
        </tr>
        <tr>
          <td class="base-info">
            <Checkbox :model-value="x.checked"></Checkbox>
          </td>
          <td>
            <div class="productBox">
              <div class="producrt-img"><img :src="x.img" alt="" /></div>
              <div class="product-info">
                <p>
                  <a href="javascript:;">{{ x.name }}</a>
                </p>
                <p class="tip-info">{{ x.tip }}</p>
              </div>
            </div>
          </td>
          <td class="base-info">{{ x.price }}</td>
          <td class="base-info">{{ x.count }}</td>
          <td class="base-info">{{ x.total }}</td>
          <td>
            <div class="order-action">
              <span>订单详情</span>
              <span>申请售后</span>
              <span>确认收货</span>
            </div>
          </td>
        </tr>
      </template>
    </table>
    <div
      class="clearfix"
      :class="{ 'order-wrap': !isOver, 'order-wrap-fixed': isOver }"
      ref="orderWrap"
    >
      <div class="cart-tip fl">
        <a href="/#/index">继续购物</a>
        共<span>0</span>件商品，已选择<span>0</span>件
      </div>
      <div class="total fr">
        合计：<span>80</span>元
        <a href="javascript:;" class="btn" @click="orderFunc">去结算</a>
      </div>
    </div>
    <ServiceBar></ServiceBar>
  </div>
</template>
<script>
import OrderHeader from "@/components/front/OrderHeader.vue";
import Loading from "@/components/front/Loading";
import NoData from "@/components/front/NoData";
import infiniteScroll from "vue-infinite-scroll";
import ServiceBar from "@/components/front/ServiceBar.vue";
export default {
  name: "shopping-cart",
  components: {
    OrderHeader,
    Loading,
    NoData,
    ServiceBar,
  },
  data() {
    return {
      productCheckAll: false,
      modeCheckAll: false,
      produltList: [
        {
          time: "2022-12-1",
          orderNo: "2560479320126",
          ckecked: false,
          img: require("@/assets/imgs/猫2.jpg"),
          name: "中小企业信用评级数据",
          tip: "按条数购买，非一次性购买",
          price: "￥80",
          count: 100,
          total: 8000,
          lastTime: "2022-12-13 22:00:12",
          status: "未发货",
        },
        {
          time: "2022-12-1",
          orderNo: "2560479320126",
          ckecked: false,
          img: require("@/assets/imgs/猫2.jpg"),
          name: "中小企业信用评级数据",
          tip: "按条数购买，非一次性购买",
          price: "￥80",
          count: 100,
          total: 8000,
          lastTime: "2022-12-13 22:00:12",
          status: "未发货",
        },
        {
          time: "2022-12-1",
          orderNo: "2560479320126",
          ckecked: false,
          img: require("@/assets/imgs/猫2.jpg"),
          name: "中小企业信用评级数据",
          tip: "按条数购买，非一次性购买",
          price: "￥80",
          count: 100,
          total: 8000,
          lastTime: "2022-12-13 22:00:12",
          status: "未发货",
        },
        {
          time: "2022-12-1",
          orderNo: "2560479320126",
          ckecked: false,
          img: require("@/assets/imgs/猫2.jpg"),
          name: "中小企业信用评级数据",
          tip: "按条数购买，非一次性购买",
          price: "￥80",
          count: 100,
          total: 8000,
          lastTime: "2022-12-13 22:00:12",
          status: "未发货",
        },
        {
          time: "2022-12-1",
          orderNo: "2560479320126",
          ckecked: false,
          img: require("@/assets/imgs/猫2.jpg"),
          name: "中小企业信用评级数据",
          tip: "按条数购买，非一次性购买",
          price: "￥80",
          count: 100,
          total: 8000,
          lastTime: "2022-12-13 22:00:12",
          status: "未发货",
        },
        {
          time: "2022-12-1",
          orderNo: "2560479320126",
          ckecked: false,
          img: require("@/assets/imgs/猫2.jpg"),
          name: "中小企业信用评级数据",
          tip: "按条数购买，非一次性购买",
          price: "￥80",
          count: 100,
          total: 8000,
          lastTime: "2022-12-13 22:00:12",
          status: "未发货",
        },
        {
          time: "2022-12-1",
          orderNo: "2560479320126",
          ckecked: false,
          img: require("@/assets/imgs/猫2.jpg"),
          name: "中小企业信用评级数据",
          tip: "按条数购买，非一次性购买",
          price: "￥80",
          count: 100,
          total: 8000,
          lastTime: "2022-12-13 22:00:12",
          status: "未发货",
        },
      ],
      isOver: false,
    };
  },
  mounted() {
    this.getOrderList();
    this.$nextTick(() => {
      this.computedHeight();
    });
    window.addEventListener("scroll", (e) => {
      this.computedHeight();
    });
  },
  directives: {
    infiniteScroll,
  }, //设置一个infiniteScroll指令，之后就可以v-infinite-scroll进行使用了
  methods: {
    computedHeight() {
      if (
        this.$refs.tableOrder.offsetTop +
          this.$refs.tableOrder.clientHeight +
          70 -
          window.scrollY >
        window.innerHeight
      ) {
        this.isOver = true;
      } else {
        this.isOver = false;
      }
    },
    productHandleCheckAll() {
      this.productCheckAll = !this.productCheckAll;
    },
    modeHandleCheckAll() {
      this.modeCheckAll = !this.modeCheckAll;
    },
    getOrderList() {
      // this.loading=true
      // this.axios.get('/orders',{
      //     params:{
      //         pageSize:10,
      //         pageNum:this.pageNum
      //     }
      // }).then((res)=>{
      //     this.list =  this.list.concat(res.list);
      //     this.loading = false;
      //     this.total = res.total;
      //     this.showNextPage = res.hasNextPage;
      // })
    },
    goPay(orderNo) {
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo,
        },
      });
    },
    //第一种分页器方式
    handleChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },
    //第二种加载更多按钮方式
    loadMore() {
      this.pageNum++;
      this.getOrderList();
    },
    //第三种滚动加载
    scrollMore() {
      this.busy = true;
      setTimeout(() => {
        this.pageNum++;
        this.getList();
      }, 500); //设置定时器，防止一直调用接口
    },
    //滚动加载专用接口调用函数
    getList() {
      this.loading = true;
      this.axios
        .get("/orders", {
          params: {
            pageSize: 10,
            pageNum: this.pageNum,
          },
        })
        .then((res) => {
          this.list = this.list.concat(res.list);
          this.loading = false;
          if (res.hasNextPage) {
            this.busy = false;
          } else {
            this.busy = true;
          }
        });
    },
    //购物车下单
    orderFunc() {
      this.$router.push("/orderConfirm");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/reset.scss";
@import "../../../assets/scss/base.scss";
@import "../../../assets/scss/button.scss";
@import "../../../assets/scss/mixin.scss";
@import "../../../assets/scss/config.scss";
@import "view-ui-plus/dist/styles/viewuiplus.css";
.shopping-cart {
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

.table-order {
  width: 100%;
  font-size: 12px;
  border-collapse: collapse;
  font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei,
    WenQuanYi Micro Hei, Helvetica Neue, Arial, sans-serif !important;
  .title-th {
    background-color: #dfe5f6;
    height: 40px;
  }
  .order-td {
    background-color: #f6f7fb;
    height: 40px;
  }
  td {
    .productBox {
      display: flex;
      .producrt-img {
        width: 60px;
        img {
          width: 100%;
        }
      }
      .product-info {
        padding-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .tip-info {
          color: #b0b0b0;
        }
      }
    }
    .order-action {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        cursor: pointer;
        &:hover {
          color: skyblue;
        }
      }
    }
  }
  .base-info {
    font: normal 12px/1.5 Verdana, simsun, Sans-Serif;
    text-align: center;
  }
}

.order-wrap {
  background-color: #eee;
  font-size: 14px;
  color: #666666;
  margin-top: 20px;
  height: 50px;
  line-height: 50px;
  .cart-tip {
    margin-left: 29px;
    a {
      color: #666666;
      margin-right: 37px;
    }
    span {
      color: #ff6600;
      margin: 0 5px;
    }
  }
  .total {
    font-size: 14px;
    color: #ff6600;
    span {
      font-size: 24px;
    }
    a {
      width: 202px;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      margin-left: 37px;
    }
  }
}

.order-wrap-fixed {
  position: fixed;
  width: 1226px;
  left: 50%;
  margin-left: -613px;
  bottom: 0;
  z-index: 20;
  background-color: #eee;
  font-size: 14px;
  color: #666666;
  height: 50px;
  line-height: 50px;
  .cart-tip {
    margin-left: 29px;
    a {
      color: #666666;
      margin-right: 37px;
    }
    span {
      color: #ff6600;
      margin: 0 5px;
    }
  }
  .total {
    font-size: 14px;
    color: #ff6600;
    span {
      font-size: 24px;
    }
    a {
      width: 202px;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      margin-left: 37px;
    }
  }
}
</style>