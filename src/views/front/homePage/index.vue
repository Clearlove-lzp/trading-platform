<template>
  <div class="index">
    <Catergory></Catergory>
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">经济建设</a>
              <div class="children">
                <ul v-for="(item, i) in menuList" :key="i">
                  <li v-for="(sub, j) in item" :key="j">
                    <a :href="sub ? '/#/product/' + sub.id : ''">
                      <img
                        :src="
                          sub
                            ? sub.img
                            : require('@/assets/imgs/item-box-1.png')
                        "
                        alt=""
                      />
                      {{ sub ? sub.name : "小米9" }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">道路交通</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">环境资源</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">教育科技</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">文化休闲</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">城市管理</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">机构团体</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">民生服务</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">地理空间</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">气象气候</a>
            </li>
          </ul>
        </div>
        <swiper
          ref="mySwiper"
          class="mySwiper"
          :modules="modules"
          :navigation="true"
          :loop="true"
          :autoplay="{ delay: 10000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          effect="cube"
          :cubeEffect="{ shadowOffset: 100, shadowScale: 0.6 }"
        >
          <swiper-slide v-for="(item, index) in slideList" :key="index">
            <a :href="'/#/product/' + item.id"
              ><img :src="item.img" alt=""
            /></a>
          </swiper-slide>
        </swiper>
      </div>
      <div class="ads-box">
        <a
          :href="'/#/product/' + item.id"
          v-for="(item, index) in adsList"
          :key="index"
        >
          <img v-lazy="item.img" alt="" />
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="require('@/assets/imgs/banner-1.png')" alt="" />
        </a>
      </div>
      <div class="product-box">
        <h2>数据产品</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35"
              ><img v-lazy="require('@/assets/imgs/mix-alpha.jpg')" alt=""
            /></a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, i) in phoneList" :key="i">
              <template v-for="(item, j) in arr">
                <div class="item" :key="j" v-if="(i + 1) * (j + 1) < 8">
                  <span :class="{ 'new-pro': j % 2 == 0 }">新品</span>
                  <div class="item-img">
                    <img v-lazy="item.mainImage" alt="" />
                  </div>
                  <div class="item-info">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.subtitle }}</p>
                    <p class="price" @click="addCart(item.id)">
                      {{ item.price }}元
                    </p>
                  </div>
                </div>
                <div
                  class="item item-last"
                  :key="j"
                  v-if="(i + 1) * (j + 1) === 8"
                >
                  <div class="item-last-top">
                    <div class="item-last-top-left">
                      <h3>{{ item.name }}</h3>
                      <p class="price" @click="addCart(item.id)">
                        {{ item.price }}元
                      </p>
                    </div>
                    <div class="item-last-top-right">
                      <div class="item-last-top-img">
                        <img v-lazy="item.mainImage" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="item-last-bottom">
                    <div class="item-last-bottom-left">
                      <h2>浏览更多</h2>
                      <p>数据产品</p>
                    </div>
                    <div class="item-last-bottom-right">
                      <Icon
                        class="item-last-bottom-right-icon"
                        :size="40"
                        type="ios-arrow-dropright"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="product-box">
        <h2>数据服务</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35"
              ><img v-lazy="require('@/assets/imgs/mix-alpha.jpg')" alt=""
            /></a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, i) in phoneList" :key="i">
              <template v-for="(item, j) in arr">
                <div class="item" :key="j" v-if="(i + 1) * (j + 1) < 8">
                  <span :class="{ 'new-pro': j % 2 == 0 }">新品</span>
                  <div class="item-img">
                    <img v-lazy="item.mainImage" alt="" />
                  </div>
                  <div class="item-info">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.subtitle }}</p>
                    <p class="price" @click="addCart(item.id)">
                      {{ item.price }}元
                    </p>
                  </div>
                </div>
                <div
                  class="item item-last"
                  :key="j"
                  v-if="(i + 1) * (j + 1) === 8"
                >
                  <div class="item-last-top">
                    <div class="item-last-top-left">
                      <h3>{{ item.name }}</h3>
                      <p class="price" @click="addCart(item.id)">
                        {{ item.price }}元
                      </p>
                    </div>
                    <div class="item-last-top-right">
                      <div class="item-last-top-img">
                        <img v-lazy="item.mainImage" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="item-last-bottom">
                    <div class="item-last-bottom-left">
                      <h2>浏览更多</h2>
                      <p>数据服务</p>
                    </div>
                    <div class="item-last-bottom-right">
                      <Icon
                        class="item-last-bottom-right-icon"
                        :size="40"
                        type="ios-arrow-dropright"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      v-bind:showModal="showModal"
      v-on:submit="goToCart"
      v-on:cancel="showModal = false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>
<script>
import ServiceBar from "@/components/front/ServiceBar.vue";
import Catergory from "@/components/front/Catergory.vue";
import Modal from "@/components/front/Modal";
import SwiperCore, {
  EffectCube,
  Navigation,
  Autoplay,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import { productlist } from "./index.js";

SwiperCore.use([EffectCube, Navigation, Autoplay, Pagination]);

export default {
  name: "index",
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide,
    Catergory,
    Modal,
  },
  data() {
    return {
      slideList: [
        {
          id: "42",
          img: require("@/assets/imgs/slider/slide-1.jpg"),
        },
        {
          id: "45",
          img: require("@/assets/imgs/slider/slide-2.jpg"),
        },
        {
          id: "46",
          img: require("@/assets/imgs/slider/slide-3.jpg"),
        },
        {
          id: "",
          img: require("@/assets/imgs/slider/slide-4.jpg"),
        },
        {
          id: "",
          img: require("@/assets/imgs/slider/slide-5.jpg"),
        },
      ],
      menuList: [
        [
          {
            id: 30,
            img: require("@/assets/imgs/item-box-1.png"),
            name: "小米CC9",
          },
          {
            id: 31,
            img: require("@/assets/imgs/item-box-2.png"),
            name: "小米8青春版",
          },
          {
            id: 32,
            img: require("@/assets/imgs/item-box-3.jpg"),
            name: "Redmi K20 Pro",
          },
          {
            id: 33,
            img: require("@/assets/imgs/item-box-4.jpg"),
            name: "移动4G专区",
          },
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      adsList: [
        {
          id: 33,
          img: require("@/assets/imgs/ads/ads-1.png"),
        },
        {
          id: 48,
          img: require("@/assets/imgs/ads/ads-2.jpg"),
        },
        {
          id: 45,
          img: require("@/assets/imgs/ads/ads-3.png"),
        },
        {
          id: 47,
          img: require("@/assets/imgs/ads/ads-4.jpg"),
        },
      ],
      phoneList: [],
      showModal: false,
      modules: [EffectCube, Navigation, Autoplay, Pagination],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // this.axios.get('/products',{
      //     params: {
      //        categoryId:'100012',
      //        pageSize:14
      //     }
      // }).then((res)=>{
      //     res.list=res.list.slice(6,14);
      //     this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)];
      // })
      const arr = productlist.slice(6, 14);
      this.phoneList = [arr.slice(0, 4), arr.slice(4, 8)];
    },
    addCart(id) {
      this.axios
        .post("/carts", {
          productId: id,
          selected: true,
        })
        .then((res) => {
          this.showModal = true;
          this.$store.dispatch("saveCartCount", res.cartTotalQuantity);
        });
    },
    goToCart() {
      this.$router.push("/cart");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/reset.scss";
@import "../../../assets/scss/mixin.scss";
@import "../../../assets/scss/config.scss";
@import "../../../assets/scss/base.scss";
@import "view-ui-plus/dist/styles/viewuiplus.css";
.index {
  .container {
    .swiper-box {
      .swiper-container {
        height: 451px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nav-menu {
        position: absolute;
        width: 264px;
        height: 451px;
        z-index: 9;
        padding: 26px 0;
        background-color: #55585a7a;
        box-sizing: border-box;
        .menu-wrap {
          .menu-item {
            position: relative;
            padding-left: 30px;
            height: 40px;
            line-height: 40px;
            transition: all 0.5s;
            &:hover {
              background-color: $colorA;
              .children {
                display: block;
              }
            }
            a {
              color: #ffffff;
              font-size: 16px;
              &::after {
                content: "";
                position: absolute;
                top: 17.5px;
                right: 30px;
                @include bgImg(15px, 10px, "@/assets/imgs/icon-arrow.png");
              }
            }
            .children {
              display: none;
              width: 962px;
              height: 451px;
              border: 1px solid $colorH;
              background-color: $colorG;
              position: absolute;
              top: -26px;
              left: 264px;
              ul {
                display: flex;
                justify-content: space-between;
                height: 75px;
                li {
                  height: 75px;
                  line-height: 75px;
                  flex: 1;
                  padding-left: 23px;
                  a {
                    color: $colorB;
                    font-size: 14px;
                  }
                  img {
                    width: 35px;
                    height: 42px;
                    vertical-align: middle;
                    margin-right: 15px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .ads-box {
      @include flex();
      margin-top: 14px;
      margin-bottom: 31px;
      a {
        width: 296px;
        height: 167px;
      }
    }
    .banner {
      margin-bottom: 50px;
    }
    .product-box {
      background-color: $colorJ;
      padding-top: 30px;
      margin-bottom: 30px;
      h2 {
        font-size: $fontF;
        height: 21px;
        line-height: 21px;
        color: $colorB;
        margin-bottom: 20px;
      }
      .wrapper {
        display: flex;
        .banner-left {
          margin-right: 16px;
          img {
            width: 224px;
            height: 619px;
          }
        }
        .list-box {
          .list {
            @include flex();
            width: 986px;
            margin-bottom: 14px;
            &:last-child {
              margin-bottom: 0;
            }
            .item {
              width: 236px;
              height: 302px;
              background-color: $colorG;
              text-align: center;
              span {
                display: inline-block;
                width: 67px;
                height: 24px;
                font-size: 14px;
                line-height: 24px;
                color: $colorG;
                &.new-pro {
                  background-color: #7ecf68;
                }
                &.kill-pro {
                  background-color: #e82626;
                }
              }
              .item-img {
                img {
                  width: 100%;
                  height: 150px;
                  margin-bottom: 15px;
                }
              }
              .item-info {
                h3 {
                  font-size: $fontJ;
                  color: $colorB;
                  line-height: $fontJ;
                  font-weight: bold;
                }
                p {
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto 13px;
                }
                .price {
                  color: #f20a0a;
                  font-size: $fontJ;
                  font-weight: bold;
                  cursor: pointer;
                  // &:after{
                  // 	@include bgImg(22px,22px,'@/assets/imgs/icon-cart-hover.png');
                  // 	content:' ';
                  // 	margin-left:5px;
                  // 	vertical-align: middle;
                  // }
                }
              }
            }
            .item-last {
              background-color: $colorJ;
              .item-last-top {
                background-color: $colorG;
                height: 150px;
                margin-bottom: 10px;
                .item-last-top-left {
                  width: 118px;
                  height: 150px;
                  float: left;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  .price {
                    color: #f20a0a;
                    font-size: $fontJ;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 10px;
                  }
                }
                .item-last-top-right {
                  width: 118px;
                  height: 150px;
                  float: left;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  .item-last-top-img {
                    width: 100%;
                    img {
                      width: 100%;
                    }
                  }
                }
              }
              .item-last-bottom {
                background-color: $colorG;
                height: 142px;
                .item-last-bottom-left {
                  width: 118px;
                  height: 142px;
                  float: left;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  .price {
                    color: #f20a0a;
                    font-size: $fontJ;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 10px;
                  }
                }
                .item-last-bottom-right {
                  width: 118px;
                  height: 142px;
                  float: left;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  .item-last-bottom-right-icon {
                    font-size: 40px;
                    color: orange;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

.swiper-button-prev {
  left: 274px;
}

.mySwiper {
  height: 451px;
}
</style>