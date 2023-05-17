<template>
  <div class="shopping-cart">
    <div class="page-center">
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
      <Row >
        <Col span="24">
          <Row class-name="table-header">
            <Col class-name="cell" span="3">图片</Col>
            <Col class-name="cell" span="9">商品名称</Col>
            <Col class-name="cell" span="3">单价</Col>
            <Col class-name="cell" span="3">购买数量</Col>
            <Col class-name="cell" span="3">小计</Col>
            <Col class-name="cell" span="3">操作</Col>
          </Row>
          <Collapse v-model="value">
            <Panel class="my-panel" v-for="(item, index) in produltList" :key="index" :name="item.data_name">
              <Row class-name="header">
                <Col class-name="cell" span="3">
                  <Image :src="agencyStr + '/file' + item.data_pic" width="86px" height="86px" :alt="item.data_name" />
                </Col>
                <Col class-name="cell" span="9">{{item.data_name}}</Col>
                <Col class-name="cell" span="3">{{item.data_per_price}}元</Col>
                <Col class-name="cell" span="3">{{item.count}}{{ item.data_type==="图片"?"张":"个" }}</Col>
                <Col class-name="cell" span="3">{{item.amount}}元</Col>
                <Col class-name="cell" span="3">操作</Col>
              </Row>
              <template #content>
                <Row class-name="row" v-for="(item2, index2) in item.children" :key="index2" :gutter="20">
                  <Col class-name="cell "  span="3"></Col>
                  <Col class-name="cell detail_cell" span="9">{{item2.data_name}}</Col>
                  <Col class-name="cell detail_cell" span="3">{{item2.data_per_price}}元</Col>
                  <Col class-name="cell detail_cell" span="3">{{item2.count}}{{ item.data_type==="图片"?"张":"个" }}</Col>
                  <Col class-name="cell detail_cell" span="3">{{item2.amount}}元</Col>
                  <Col class-name="cell detail_cell" span="3">操作</Col>
                </Row>
              </template>
            </Panel>
          </Collapse>
        </Col>
      </Row>
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
  </div>
</template>
<script>
import OrderHeader from "@/components/front/OrderHeader.vue";
import Loading from "@/components/front/Loading";
import NoData from "@/components/front/NoData";
import infiniteScroll from "vue-infinite-scroll";
import ServiceBar from "@/components/front/ServiceBar.vue";
import { getCart } from "@/api/index";
import { Message } from "view-ui-plus";
import { agencyStr } from "@/axiosConfig/enviromentConfig.js";
import { flattenObject } from "@/libs/util";

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
      ],
      columns: [
        {
            title: '商品',
            key: 'data_name',
            tree: true
        },
        {
            title: '单价',
            key: 'data_per_price'
        },
        {
            title: '数量',
            key: 'count'
        },
        {
            title: '',
            key: 'data_pic'
        },
        {
            title: '小计',
            key: 'amount'
        }
      ],
      agencyStr: agencyStr,
      isOver: false,
      pageNum: 1,
    };
  },
  mounted() {
    this.getOrderList();
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
    convertToString (data_type, item){
      if(data_type === "图片"){
          return item.dpi + "dpi, 大小 " + item.width + " x " + item.height + " px的图片";
      }else if(data_type === "文本"){
          return "文本数据";
      }else if(data_type === "结构化"){
          return  "购买的属性：" + item.join(' | ');
      }else if(data_type === "视频"){
          return `清晰度${item.title}，${item.fps}帧/秒`;
      }else if(data_type === "音频"){
          return `音质${item.title}`;
      }

    },
    getOrderList() {
      let params = `?page=${this.pageNum}&count=${10}`;
      getCart(params).then((res) => {
        if(res.data.code===0){
          Message.error(res.data.msg);
        }else{
          Message.success(res.data.msg);
          let data = flattenObject(res.data.data);
          data.forEach((item, index) => {
            data[index].count = 0
            data[index].children = []
            data[index].amount = 0

            item.item.item.forEach((item2, index2) => {
              if(item2.num === 0){
                return;
              }
              data[index].count += item2.num;
              data[index].amount += item2.num * item.data_per_price;

              let child = {}
              child.data_name = this.convertToString(item.data_type,item2.item);
              child.count = item2.num;
              child.amount = item2.num * item.data_per_price;
              child.data_per_price = item.data_per_price;
              data[index].children.push(child)
            })
          })
          this.produltList = this.produltList.concat(data)
          console.log(this.produltList)
        }
      })
    },
    goPay(orderNo) {
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo,
        },
      });
    },

    //第二种加载更多按钮方式
    loadMore() {
      this.pageNum++;
      this.getOrderList();
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
  background-color: #F7F7F7;
  .page-center{
    width: 1226px;
    margin: 0 auto;
    :deep(.ivu-row>.ivu-col>.ivu-collapse){
      border: none;
    }
    :deep(.ivu-row>.ivu-col>.ivu-collapse>.ivu-collapse-item>.ivu-collapse-header){
      height:118px;
      padding: 15px 26px 15px 0;
      display: flex;
      background-color: #FFF;
      line-height: 86px;
      border: none;
      border-top: 1px solid #e0e0e0;
      i{
        line-height: 86px;
        margin-right: 0;
        margin-left: 14px;
      }
      .ivu-row{
        width: 100%
      }
    }
    .table-header{
      padding: 20px 28px;
      background-color: #FFF;
        .cell{
          text-align: center;
        }
      }
    .my-panel{
      .row{
        .detail_cell{
          box-sizing: border-box;
          border-top: 1px solid #e0e0e0;
          padding: 25px 0px;
        }
      }
      .cell{
        text-align: center;
      }
      
    }
  }
    
 
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