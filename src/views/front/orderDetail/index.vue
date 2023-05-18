<template>
  <div class="order-list">
    <div class="nav-header">
      <div class="container">
        <div class="main-title">订单详情</div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>

    <div class="order-detail-one wrapper">
      <div class="left">
        <div class="order-num">订单号：231545686223</div>
        <div class="order-state">完成</div>
        <div class="order-img">
          <a href="#"><img src="@/assets/imgs/prodect.png" alt="" /></a>
        </div>
      </div>
      <div class="right">
        <div class="right-img">
          <div class="one">
            <div class="box">
              <img src="@/assets/imgs/提交订单.png" alt="" />
              <span class="text">∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙></span>
              <div class="submit">
                <div>提交订单</div>
                <div>2022-12-2</div>
                <div>20:43</div>
              </div>
            </div>
            <div class="box">
              <img src="@/assets/imgs/支付成功.png" alt="" />
              <span class="text">∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙></span>
              <div class="submit">
                <div>支付成功</div>
                <div>2022-12-2</div>
                <div>20:43</div>
              </div>
            </div>
            <div class="box">
              <img src="@/assets/imgs/授权成功.png" alt="" />
              <span class="text">∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙></span>
              <div class="submit">
                <div>卖家发货</div>
                <div>2022-12-2</div>
                <div>20:43</div>
              </div>
            </div>
            <div class="box">
              <img src="@/assets/imgs/确认收货.png" alt="" />
              <div class="submit">
                <div>确认收货</div>
                <div>2022-12-2</div>
                <div>20:43</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <table class="table-order">
      <tr>
        <th class="title-th" colspan="2">商品</th>
        <th class="title-th" width="13%">单价</th>
        <th class="title-th" width="13%">数量</th>
        <th class="title-th" width="13%">实付款</th>
        <th class="title-th" width="13%">订单状态</th>
        <th class="title-th" width="13%">操作</th>
      </tr>
      <template v-for="(x, i) in produltList" :key="i">
        <tr>
          <td class="order-td base-info">{{ x.time }}</td>
          <td class="order-td">订单号：{{ x.orderNo }}</td>
          <td class="order-td"></td>
          <td class="order-td"></td>
          <td class="order-td"></td>
          <td class="order-td"></td>
          <td class="order-td"></td>
        </tr>
        <tr>
          <td colspan="2">
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
          <td class="base-info">{{ x.status }}</td>
          <td>
            <div class="order-action">
              <span>申请售后</span>
              <span>确认收货</span>
            </div>
          </td>
        </tr>
      </template>
    </table>

    <div class="information wrapper">
      <div class="left-one">
        <div class="user">订单信息</div>
        <div class="user-name">订单编号：12313564</div>
        <div class="phone">买家留言-</div>
        <div class="phone">发票抬头</div>
        <div class="phone">发票类型：电子发票</div>
        <div class="phone">发票内容：明细</div>
      </div>
      <div class="left">
        <div class="user">用户信息</div>
        <div class="user-name">收货人：2135465412</div>
        <div class="phone">联系方式：136******5231</div>
      </div>
      <div class="right">
        <div class="user">付款信息</div>
        <div class="user-name">付款方式：在线支付</div>
        <div class="phone">付款时间：2022-12-2 21:45</div>
      </div>
    </div>

    <ServiceBar></ServiceBar>
  </div>
</template>
<script>
import OrderHeader from "@/components/front/OrderHeader.vue";
import Loading from "@/components/front/Loading";
import NoData from "@/components/front/NoData";
import ServiceBar from "@/components/front/ServiceBar.vue";
export default {
  name: "order-list",
  components: {
    OrderHeader,
    Loading,
    NoData,
    ServiceBar,
  },
  data() {
    return {
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
      ],
    };
  },
  mounted() {
    this.getOrderList();
  },
  directives: {},
  methods: {
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
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/reset.scss";
@import "../../../assets/scss/mixin.scss";
@import "../../../assets/scss/config.scss";
@import "view-ui-plus/dist/styles/viewuiplus.css";
.order-list {
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
      padding: 0 20px;
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

.order-detail-one {
  margin-top: 25px;
  margin-bottom: 35px;
  display: flex;
  align-items: center;
  border-top: 3px solid #cccbcb;
  background-color: #fff;
}

.order-detail-one .left {
  flex-grow: 1;
  margin-top: 20px;
  margin-bottom: 35px;
  border-right: 1px solid #f1f1f1;
}

.order-detail-one .right {
  flex-grow: 6;
}

.order-detail-one .left .order-num {
  font-size: 14px;
  line-height: 50px;
  color: #999;
  text-align: center;
}

.order-detail-one .left .order-state {
  font-size: 24px;
  color: #71b247;
  text-align: center;
  font-weight: bold;
}

.order-detail-one .left .order-img {
  text-align: center;
}

.order-detail-one .left .order-img img {
  margin-top: 15px;
  width: 100px;
  height: 100px;
}

.order-detail-one .right .right-img .one {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-detail-one .right img {
  width: 50px;
  height: 50px;
}

.order-detail-one .right .right-img .one .text {
  padding-left: 20px;
  padding-right: 20px;
  color: #8faadc;
}

.order-detail-one .right .right-img .one .submit {
  margin-top: 15px;
  font-size: 14px;
}

.information {
  display: flex;
  justify-content: center;
  background-color: #fff;
  margin-top: 25px;
}

.information .left-one {
  padding: 20px 50px;
  flex-grow: 1;
  border-right: 1px solid #f1f1f1;
}

.information .left {
  padding: 20px 50px;
  flex-grow: 1;
  border-right: 1px solid #f1f1f1;
}

.information .right {
  padding: 20px 50px;
  flex-grow: 1;
}

.information .user {
  font-size: 18px;
  padding-bottom: 10px;
}

.information .user-name {
  padding-bottom: 5px;
}

.information .phone {
  padding-bottom: 5px;
}
</style>