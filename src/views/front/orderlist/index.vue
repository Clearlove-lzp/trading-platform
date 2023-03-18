<template>
  <div class="order-list">
    <div class="nav-header">
      <div class="container">
        <div class="main-title">我的订单</div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
    <Tabs value="name1">
      <TabPane label="全部订单" name="name1"></TabPane>
      <TabPane label="待授权" name="name2"></TabPane>
      <TabPane label="待收货" name="name3"></TabPane>
      <TabPane label="待评价" name="name4"></TabPane>
    </Tabs>
    <table class="table-order">
      <tr>
        <th class="title-th">
          <Checkbox
            :model-value="productCheckAll"
            @click.prevent="productHandleCheckAll"></Checkbox>
            <span>全选</span>
        </th>
        <th class="title-th">商品</th>
        <th class="title-th">单价</th>
        <th class="title-th">数量</th>
        <th class="title-th">实付款</th>
        <th class="title-th">最晚发货时间</th>
        <th class="title-th">订单状态</th>
        <th class="title-th">操作</th>
      </tr>
      <template v-for="(x, i) in produltList" :key="i">
        <tr>
          <td class="order-td base-info">{{x.time}}</td>
          <td class="order-td" colspan="7">订单号：{{x.orderNo}}</td>
        </tr>
        <tr>
          <td class="base-info">
            <Checkbox :model-value="x.checked"></Checkbox>
          </td>
          <td>
            <div class="productBox">
              <div class="producrt-img"><img :src="x.img" alt=""></div>
              <div class="product-info">
                <p><a href="javascript:;">{{x.name}}</a></p>
                <p class="tip-info">{{x.tip}}</p>
              </div>
            </div>
          </td>
          <td class="base-info">{{x.price}}</td>
          <td class="base-info">{{x.count}}</td>
          <td class="base-info">{{x.total}}</td>
          <td class="base-info">{{x.lastTime}}</td>
          <td class="base-info">{{x.status}}</td>
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
    <ServiceBar></ServiceBar>
  </div>
</template>
<script>
  import OrderHeader from '@/components/front/OrderHeader.vue'
  import Loading from '@/components/front/Loading'
  import NoData from '@/components/front/NoData'
  import infiniteScroll from 'vue-infinite-scroll'
  import ServiceBar from '@/components/front/ServiceBar.vue'
  export default{
    name:'order-list',
    components:{
      OrderHeader,
      Loading,
      NoData,
      ServiceBar
    },
    data(){
      return{
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
          }
        ]
      }
    },
    mounted(){
        this.getOrderList();
    },
    directives: {
      infiniteScroll
    },//设置一个infiniteScroll指令，之后就可以v-infinite-scroll进行使用了
    methods:{
      productHandleCheckAll() {
        this.productCheckAll = !this.productCheckAll;
      },
      modeHandleCheckAll() {
        this.modeCheckAll = !this.modeCheckAll;
      },
      getOrderList(){
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
      goPay(orderNo){
          this.$router.push({
              path:'/order/pay',
              query:{
                  orderNo
              }
          })
      },
      //第一种分页器方式
      handleChange(pageNum){
          this.pageNum = pageNum;
          this.getOrderList();
      },
      //第二种加载更多按钮方式
      loadMore(){
          this.pageNum++;
          this.getOrderList();
      },
      //第三种滚动加载
      scrollMore(){
        this.busy = true;
        setTimeout(()=>{
          this.pageNum++;
          this.getList();
        },500);//设置定时器，防止一直调用接口
      },
      //滚动加载专用接口调用函数
      getList(){
          this.loading= true;
          this.axios.get('/orders',{
              params:{
                  pageSize:10,
                  pageNum:this.pageNum
              }
          }).then((res)=>{
              this.list =  this.list.concat(res.list);
              this.loading = false;
              if(res.hasNextPage){
                  this.busy=false;
              }else{
                  this.busy =true
              }
          })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/config.scss';
  @import '../../../assets/scss/mixin.scss';
  @import "view-ui-plus/dist/styles/viewuiplus.css";
  .order-list{
    width: 1226px;
    margin: 0 auto;
  }
  .nav-header{
  .container{
    @include flex();
    position: relative;
    height: 112px;
    width: 1226px;
    margin: 0 auto;
    .main-title{
      // font-weight: bold;
      font-size: 30px;
    }
    .header-search{
      width: 319px;
      .wrapper{
        height:50px;
        border:1px solid #E0E0E0;
        display:flex;
        align-items:center;
        input{
          border: none;
          box-sizing: border-box;
          border-right: 1px solid #E0E0E0;
          width: 264px;
          height: 48px;
          padding-left: 14px;
        }
        a{
          @include bgImg(18px,18px,'@/assets/imgs/icon-search.png');
          margin-left: 17px;
        }
      }
    }
  }
}

.table-order{
  width: 100%;
  font-size: 12px;
  border-collapse: collapse;
  font-family: PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,Helvetica Neue,Arial,sans-serif !important;
  .title-th{
    background-color: #dfe5f6;
    height: 40px;
  }
  .order-td {
    background-color: #f6f7fb;
    height: 40px;
  }
  td{
    .productBox{
      display: flex;
      .producrt-img{
        width: 60px;
        img {
          width: 100%;
        }
      }
      .product-info{
        padding-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .tip-info {
          color: #b0b0b0;
        }
      }
    }
    .order-action{
      display: flex;
      flex-direction: column;
      align-items: center;
      span{
        cursor: pointer;
        &:hover{
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
</style>