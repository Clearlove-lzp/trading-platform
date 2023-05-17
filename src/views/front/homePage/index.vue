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
        >
          <swiper-slide v-for="(item, index) in idnexData.banner" :key="index">
            <a
              :href="
                item.recommend.target_url
                  ? item.recommend.target_url
                  : '/product/' + item.data.data_id
              "
            >
              <img
                :src="
                  !item.recommend.pic || item.recommend.pic === null
                    ? agencyStr + '/file' + item.data.data_pic
                    : agencyStr + '/file' + item.recommend.pic
                "
                :alt="item.data.data_name"
              />
            </a>
          </swiper-slide>
        </swiper>
      </div>
      <!-- <div class="ads-box">
        <a
          :href="'/product/' + item.data_id"
          v-for="(item, index) in idnexData.product"
          :key="index"
        >
          <img v-lazy="item.recommend.pic ? 
            agencyStr + '/file' + item.recommend.pic : 
            agencyStr + '/file' +item.data.data_pic" 
            :alt="item.data.data_name" 
          />
        </a>
      </div> -->
      <!-- <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="require('@/assets/imgs/banner-1.png')" alt="" />
        </a>
      </div> -->
    </div>
    <div class="product">
      <div class="container">
        <div class="product-box">
          <h2>数据产品</h2>
          <div class="wrapper">
            <!-- <div class="banner-left">
            <a href="/#/product/35"
              ><img v-lazy="require('@/assets/imgs/mix-alpha.jpg')" alt=""
            /></a>
          </div> -->
            <div class="list-box">
              <div class="list">
                <template v-for="(item, i) in idnexData.product" :key="i">
                  <a
                    :href="
                      item.recommend.target_url
                        ? item.recommend.target_url
                        : '/product/' + item.data.data_id
                    "
                  >
                    <div class="item" v-if="i + 1 <= 9">
                      <span :class="{ 'new-pro': i % 2 == 0 }">新品</span>
                      <div class="item-img">
                        <img
                          v-lazy="
                            item.recommend.pic
                              ? agencyStr + '/file' + item.recommend.pic
                              : agencyStr + '/file' + item.data.data_pic
                          "
                          :alt="item.data.data_name"
                        />
                      </div>
                      <div class="item-info">
                        <h3>{{ item.data.data_name }}</h3>
                        <p>{{ item.data.data_intro }}</p>
                        <p class="price" @click="addCart(item.data.data_id)">
                          {{ item.data.data_per_price }}元
                        </p>
                      </div>
                    </div>
                  </a>
                  <div class="item item-last" :key="j" v-if="i + 1 === 10">
                    <a
                      :href="
                        item.recommend.target_url
                          ? item.recommend.target_url
                          : '/product/' + item.data.data_id
                      "
                    >
                      <div class="item-last-top">
                        <div class="item-last-top-left">
                          <h3>{{ item.data.data_name }}</h3>
                          <p class="price" @click="addCart(item.data.data_id)">
                            {{ item.data.data_per_price }}元
                          </p>
                        </div>
                        <div class="item-last-top-right">
                          <div class="item-last-top-img">
                            <img
                              v-lazy="
                                item.recommend.pic
                                  ? agencyStr + '/file' + item.recommend.pic
                                  : agencyStr + '/file' + item.data.data_pic
                              "
                              :alt="item.data.data_name"
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                    <a
                      :href="
                        item.recommend.target_url
                          ? item.recommend.target_url
                          : '/product/' + item.data.data_id
                      "
                    >
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
                    </a>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="product-box">
          <h2>数据服务</h2>
          <div class="wrapper">
            <!-- <div class="banner-left"> -->
            <!-- <a href="/#/product/35"
              ><img v-lazy="require('@/assets/imgs/mix-alpha.jpg')" alt=""
            /></a>
          </div> -->
            <div class="list-box">
              <div class="list">
                <template v-for="(item, i) in idnexData.service" :key="i">
                  <a
                    :href="
                      item.recommend.target_url
                        ? item.recommend.target_url
                        : '/product/' + item.data.data_id
                    "
                  >
                    <div class="item" v-if="i + 1 <= 9">
                      <span :class="{ 'new-pro': i % 2 == 0 }">新品</span>
                      <div class="item-img">
                        <img
                          v-lazy="
                            item.recommend.pic
                              ? agencyStr + '/file' + item.recommend.pic
                              : agencyStr + '/file' + item.data.data_pic
                          "
                          :alt="item.data.data_name"
                        />
                      </div>
                      <div class="item-info">
                        <h3>{{ item.data.data_name }}</h3>
                        <p>{{ item.data.data_intro }}</p>
                        <p class="price" @click="addCart(item.data.data_id)">
                          {{ item.data.data_per_price }}元
                        </p>
                      </div>
                    </div>
                  </a>
                  <div class="item item-last" :key="j" v-if="i + 1 === 10">
                    <a
                      :href="
                        item.recommend.target_url
                          ? item.recommend.target_url
                          : '/product/' + item.data.data_id
                      "
                    >
                      <div class="item-last-top">
                        <div class="item-last-top-left">
                          <h3>{{ item.data.data_name }}</h3>
                          <p class="price" @click="addCart(item.data.data_id)">
                            {{ item.data.data_per_price }}元
                          </p>
                        </div>
                        <div class="item-last-top-right">
                          <div class="item-last-top-img">
                            <img
                              v-lazy="
                                item.recommend.pic
                                  ? agencyStr + '/file' + item.recommend.pic
                                  : agencyStr + '/file' + item.data.data_pic
                              "
                              :alt="item.data.data_name"
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                    <a
                      :href="
                        item.recommend.target_url
                          ? item.recommend.target_url
                          : '/product/' + item.data.data_id
                      "
                    >
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
                    </a>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <service-bar></service-bar> -->
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
import { productlist } from "./index.js";
import { agencyStr } from "@/axiosConfig/enviromentConfig";

import { getRec } from "@/api/index.js";
import { Message } from "view-ui-plus";

SwiperCore.use([Navigation, Autoplay, Pagination]);

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
      agencyStr: agencyStr,
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
      modules: [Navigation, Autoplay, Pagination],
      idnexData: {
        banner: [],
        service: [],
        product: [],
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.loadData("banner");
      this.loadData("service");
      this.loadData("product");
      console.log(this.idnexData);
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
    //加载数据
    loadData(type) {
      let params = `?type=${type}`;
      getRec(params).then((res) => {
        if (res.data.code === 1) {
          this.idnexData[type] = res.data.data;
        } else {
          Message.error(res.data.msg);
        }
      });
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
  .product {
    background-color: #f5f5f5;
  }
  .container {
    :deep(.swiper) {
      .swiper-button-prev {
        left: var(--swiper-navigation-sides-offset, 270px);
      }
    }
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
      padding-top: 80px;
      padding-bottom: 30px;
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
            width: 100%;
            // margin-bottom: 14px;
            gap: 14px;
            flex-wrap: wrap;
            &:last-child {
              margin-bottom: 0;
            }
            .item {
              border-radius: 4px;
              width: 230px;
              height: 302px;
              background-color: $colorG;
              text-align: center;
              transition: all 0.3s linear;
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
                  width: 150px;
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
            .item:hover {
              box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
              transform: translateY(-3px);
              transition: all 0.3s linear;
            }
            .item-last {
              a {
                color: black;
              }
              background-color: $colorJ;
              .item-last-top {
                border-radius: 4px;
                transition: all 0.3s linear;
                background-color: $colorG;
                height: 150px;
                margin-bottom: 10px;
                .item-last-top-left {
                  width: 115px;
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
                  width: 115px;
                  height: 150px;
                  float: left;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  .item-last-top-img {
                    width: 100%;
                    img {
                      width: 80px;
                      height: 80px;
                    }
                  }
                }
              }
              .item-last-bottom {
                border-radius: 4px;
                background-color: $colorG;
                transition: all 0.3s linear;
                height: 142px;
                .item-last-bottom-left {
                  width: 115px;
                  height: 142px;
                  float: left;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  color: #999999;
                  .price {
                    color: #f20a0a;
                    font-size: $fontJ;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 10px;
                  }
                }
                .item-last-bottom-right {
                  width: 115px;
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
              .item-last-bottom:hover,
              .item-last-top:hover {
                box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
                transform: translateY(-3px);
                transition: all 0.3s linear;
              }
            }
            .item-last:hover {
              box-shadow: none;
              transform: none;
              transition: all 0.3s linear;
            }
          }
        }
      }
    }
    .product-box:last-child {
      padding-top: 20px;
    }
  }
}

.mySwiper {
  height: 451px;
}
</style>