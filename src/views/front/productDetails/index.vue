<template>
  <Row justify="center" v-if="dataDetails !== null">
    <Col class-name="center">
      <Row justify="center" class-name="good">
        <Col class-name="good-img" span="12">
          <img
            :src="agencyStr + '/file' + dataDetails.data.data_pic"
            :alt="dataDetails.data_name"
          />
        </Col>
        <Col span="12">
          <Row class-name="data-base-info">
            <Col span="24">
              <div class="title">{{ dataDetails.data.data_name }}</div>
              <div class="desc">{{ dataDetails.data.data_intro }}</div>
              <div class="seller">{{ dataDetails.seller.seller_name }}</div>
              <div class="price">
                {{ dataDetails.data.data_per_price }}&nbsp 元
              </div>
              <Divider />
            </Col>
          </Row>
          <!-- 选择规格表单 -->
          <Row class-name="spec">
            <Col span="24">
              <div class="sub-title">选择数据规格</div>
              <Form :model="AppliForm" :label-width="100">
                <!-- 文本结构化表单 -->
                <FormItem
                  v-if="
                    ['文本', '结构化'].indexOf(dataDetails.data.data_type) > -1
                  "
                  :label="
                    dataDetails.data.data_type === '文本'
                      ? '文本的条数'
                      : dataDetails.data.data_type === '结构化'
                      ? '数据的条数'
                      : '数据的条数'
                  "
                >
                  <InputNumber
                    v-model="AppliForm.item[0].num"
                    :min="0"
                    :max="dataDetails.data.data_attr.num"
                    controls-outside
                  ></InputNumber>
                  <Button
                    class-name="max"
                    type="text"
                    shape="circle"
                    @click="
                      AppliForm.item[0].num = dataDetails.data.data_attr.num
                    "
                    >最大</Button
                  >
                </FormItem>
                <!-- 图片表单 -->
                <FormItem
                  v-if="dataDetails.data.data_type === '图片'"
                  label="清晰度"
                >
                  <Row
                    class-name="num"
                    v-for="(item, index) in dataDetails.data.data_attr.num"
                    :key="index"
                  >
                    <Col span="3">{{ item.dpi }}dpi</Col>
                    <Col>
                      <InputNumber
                        v-if="AppliForm.item[index]"
                        v-model="AppliForm.item[index].num"
                        controls-outside
                        :min="0"
                        :max="item.num"
                      />
                      张
                    </Col>
                    <Col
                      ><Button
                        class-name="max"
                        type="text"
                        shape="circle"
                        @click="AppliForm.item[index].num = item.num"
                        >最大</Button
                      ></Col
                    >
                  </Row>
                </FormItem>
                <!-- 结构化表单 -->
                <FormItem
                  v-if="
                    dataDetails.data.data_type === '结构化' &&
                    dataDetails.data.data_preview &&
                    dataDetails.data.data_preview.columns
                  "
                  label="选择属性"
                >
                  <CheckboxGroup v-model="AppliForm.item.item">
                    <Checkbox
                      v-for="(item, index) in dataDetails.data.data_preview
                        .columns"
                      :key="item.key"
                      :label="item.title"
                    ></Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <!-- 视频音频表单 -->
                <FormItem
                  v-if="
                    ['视频', '音频'].indexOf(dataDetails.data.data_type) > -1
                  "
                  :label="
                    dataDetails.data.data_type === '视频' ? '清晰度' : '音质'
                  "
                >
                  <template
                    v-for="(item, index) in dataDetails.data.data_attr.num"
                    :key="index"
                  >
                    <Row class-name="num" v-if="item.num">
                      <Col span="3">{{ item.title }}</Col>
                      <Col>
                        <InputNumber
                          v-if="AppliForm.item[index]"
                          v-model="AppliForm.item[index].num"
                          controls-outside
                          :min="0"
                          :max="item.num"
                        />
                        个
                      </Col>
                      <Col
                        ><Button
                          class-name="max"
                          type="text"
                          shape="circle"
                          @click="AppliForm.item[index].num = item.num"
                          >最大</Button
                        ></Col
                      >
                    </Row>
                  </template>
                </FormItem>
              </Form>
              <Divider />
            </Col>
          </Row>
          <!-- 总计 -->
          <Row class-name="sum">
            <Col span="24">
              <Row>
                <Col class-name="sub-title" span="24"
                  ><div>购买的物品</div></Col
                >
              </Row>
              <template v-for="(item, index) in AppliForm.item" :key="index">
                <Row class-name="item" v-if="item.num > 0">
                  <Col class-name="item-desc" span="12">
                    {{ convertToString(item.item) }}
                  </Col>
                  <Col class-name="item-num" span="6">数量{{ item.num }}</Col>
                  <Col class-name="item-amount" span="6"
                    >共{{ dataDetails.data.data_per_price * item.num }}元</Col
                  >
                </Row>
              </template>
              <Row>
                <Col span="24">
                  <div class="price">总计:{{ amount }}元</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <!-- 用户的行为操作 -->
          <Row class-name="action">
            <Col span="10">
              <Button @click="addCart" class="addCart" long>加入购物车</Button>
            </Col>
            <Col span="4"></Col>
            <Col span="10">
              <Button @click="addCart" class="addCart" long>立即下单</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  </Row>
  <Row class-name="continer" justify="center" v-if="dataDetails !== null">
    <Col class-name="center">
      <Row justify="space-between">
        <Col span="11" class-name="details">
          <Row>
            <Col class-name="table-title" span="24"><div>数据详情</div></Col>
          </Row>
          <Row class-name="table-row">
            <Col class-name="table-cell" span="6">数据名称</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>{{ dataDetails.data.data_name }}</div></Col
            >
          </Row>
          <Row class-name="table-row">
            <Col class-name="table-cell" span="6">商家昵称</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>{{ dataDetails.seller.seller_name }}</div></Col
            >
          </Row>
          <Row class-name="table-row">
            <Col class-name="table-cell" span="6">数据介绍</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>{{ dataDetails.data.data_intro }}</div></Col
            >
          </Row>
          <Row class-name="table-row">
            <Col class-name="table-cell" span="6">数据类型</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>{{ dataDetails.data.data_type }}</div></Col
            >
          </Row>
          <Row class-name="table-row">
            <Col class-name="table-cell" span="6">产品类别</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>{{ dataDetails.data.data_use }}</div></Col
            >
          </Row>
          <Row
            class-name="table-row"
            v-if="dataDetails.data.data_type === '文本'"
          >
            <Col class-name="table-cell" span="6">平均长度</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>
                {{
                  dataDetails.data.data_attr
                    ? dataDetails.data.data_attr.text_avg_len
                    : ""
                }}
              </div>
            </Col>
          </Row>
          <Row
            class-name="table-row"
            v-if="dataDetails.data.data_type === '文本'"
          >
            <Col class-name="table-cell" span="6">文本语言</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>
                {{
                  dataDetails.data.data_attr
                    ? dataDetails.data.data_attr.text_language
                    : ""
                }}
              </div>
            </Col>
          </Row>
          <Row
            class-name="table-row"
            v-if="dataDetails.data.data_type === '文本'"
          >
            <Col class-name="table-cell" span="6">文本数量</Col>
            <Col class-name="table-cell table-right" span="18">
              {{
                dataDetails.data.data_attr
                  ? dataDetails.data.data_attr.num
                  : ""
              }}条
            </Col>
          </Row>
          <Row
            class-name="table-row"
            v-if="dataDetails.data.data_type === '结构化'"
          >
            <Col class-name="table-cell" span="6">属性个数</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>
                {{
                  dataDetails.data.data_attr
                    ? dataDetails.data.data_attr.attr_num
                    : ""
                }}个
              </div></Col
            >
          </Row>
          <Row
            class-name="table-row"
            v-if="dataDetails.data.data_type === '结构化'"
          >
            <Col class-name="table-cell" span="6">属性</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>
                {{
                  dataDetails.data.data_attr
                    ? dataDetails.data.data_preview.columns
                        .map((item) => item.title)
                        .join("、")
                    : ""
                }}个
              </div></Col
            >
          </Row>
          <Row
            class-name="table-row"
            v-if="dataDetails.data.data_type === '结构化'"
          >
            <Col class-name="table-cell" span="6">数据数量</Col>
            <Col class-name="table-cell table-right" span="18">
              {{
                dataDetails.data.data_attr
                  ? dataDetails.data.data_attr.num
                  : ""
              }}条
            </Col>
          </Row>
          <Row
            class-name="table-row"
            v-if="dataDetails.data.data_type === '图片'"
          >
            <Col class-name="table-cell" span="6">图片格式</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>
                {{
                  dataDetails.data.data_attr
                    ? dataDetails.data.data_attr.image_format
                    : ""
                }}
              </div></Col
            >
          </Row>
          <Row
            class-name="table-row"
            v-if="dataDetails.data.data_type === '图片'"
          >
            <Col class-name="table-cell" span="6">图片质量</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>
                <template
                  v-if="
                    dataDetails.data.data_attr && dataDetails.data.data_attr.num
                  "
                  v-for="(item, index) in dataDetails.data.data_attr.num"
                >
                  <Row>
                    <Col span="24"
                      >大小{{ item.width }}×{{ item.height }}px，{{
                        item.dpi
                      }}dpi，{{ item.num }}张</Col
                    >
                  </Row>
                </template>
              </div></Col
            >
          </Row>
          <Row
            class-name="table-row"
            v-if="dataDetails.data.data_type === '视频'"
          >
            <Col class-name="table-cell" span="6">视频质量</Col>
            <Col class-name="table-cell table-right" span="18"
              ><div>
                <template
                  v-if="
                    dataDetails.data.data_attr && dataDetails.data.data_attr.num
                  "
                  v-for="(item, index) in dataDetails.data.data_attr.num"
                >
                  <Row>
                    <Col span="24">
                      <div v-if="item.num > 0">
                        {{ item.title }}：{{ item.num }}个 {{ item.fps }}帧
                      </div>
                    </Col>
                  </Row>
                </template>
              </div></Col
            >
          </Row>
          <Row
            class-name="table-row"
            v-if="dataDetails.data.data_type === '音频'"
          >
            <Col class-name="table-cell" span="6">音频质量</Col>
            <Col class-name="table-cell table-right" span="18">
              <template
                v-if="
                  dataDetails.data.data_attr && dataDetails.data.data_attr.num
                "
                v-for="(item, index) in dataDetails.data.data_attr.num"
              >
                <Row>
                  <Col span="24">
                    <div v-if="item.num > 0">
                      {{ item.title }}：{{ item.num }}个
                    </div>
                  </Col>
                </Row>
              </template>
            </Col>
          </Row>
          <Row class-name="table-row">
            <Col class-name="table-cell table-bottom" span="6">使用领域</Col>
            <Col class-name="table-cell table-right table-bottom" span="18"
              ><div>{{ dataDetails.data.data_field }}</div></Col
            >
          </Row>
        </Col>
        <Col span="12" class-name="sample">
          <Row>
            <Col class-name="table-title">数据样例</Col>
          </Row>
          <Row class-name="table-row" justify="center">
            <Col span="24">
              <Row v-if="dataDetails.data.data_type === '图片'">
                <Swiper
                  v-if="dataDetails.data.data_preview.sample.length > 2"
                  class="mySwiper"
                  :freeModel="true"
                  :loop="
                    dataDetails.data.data_preview.sample.length > 4
                      ? true
                      : false
                  "
                  :speed="5000"
                  :slidesPerView="2"
                  :autoplay="{
                    delay: 0,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                  }"
                  :loopFillGroupWithBlank="true"
                  :normalizeSlideIndex="true"
                  :modules="modules"
                >
                  <SwiperSlide
                    v-for="(item, index) in dataDetails.data.data_preview
                      .sample"
                    :key="index"
                  >
                    <img
                      :src="agencyStr + '/file' + item"
                      :alt="dataDetails.data_name"
                    />
                  </SwiperSlide>
                </Swiper>
                <div v-else>
                  <div
                    v-for="(item, index) in dataDetails.data.data_preview
                      .sample"
                    :key="index"
                  >
                    <img
                      :src="agencyStr + '/file' + item"
                      :alt="dataDetails.data_name"
                    />
                  </div>
                </div>
              </Row>
              <Row v-if="dataDetails.data.data_type === '音频'">
                <Col span="24">
                  <Row>
                    <Col span="24">
                      <div class="prompt">样例音频列表</div>
                      <div class="tag-container">
                        <Tag
                          class="audio-tag"
                          v-for="(item, index) in audioList"
                          :key="index"
                          type="border"
                          @click="handleTagClick(index, $refs.audioPlayer)"
                          @on-close="
                            handleTagClose(index),
                              handleRemove(index, '数据样例')
                          "
                          :color="currentAudioIndex === index ? 'blue' : '#000'"
                        >
                          {{ item.split("/").at(-1) }}
                        </Tag>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <audio-player
                        v-if="audioList.length > 0"
                        class="audio-player"
                        ref="audioPlayer"
                        :audio-list="audioList"
                        @play-prev="handlePlayPrev($refs.audioPlayer)"
                        @play-next="handlePlayNext($refs.audioPlayer)"
                        @play="handlePlay($refs.audioPlayer)"
                        theme-color="#555"
                        show-playback-rate
                        :playback-rates="[0.5, 1, 1.5, 2]"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row v-if="dataDetails.data.data_type === '视频'">
                <Col span="24">
                  <div class="player-container">
                    <video-player
                      v-for="(item, index) in dataDetails.data.data_preview
                        .sample"
                      class="video-palyer"
                      width="300px"
                      muted
                      controls
                      :src="agencyStr + '/file' + item"
                      :loop="false"
                      :volume="0.1"
                    />
                  </div>
                </Col>
              </Row>
              <Row
                v-if="
                  ['文本', '结构化'].indexOf(dataDetails.data.data_type) > -1
                "
              >
                <Table
                  stripe
                  style="background-color: #f5f5f5"
                  size="small"
                  height="400"
                  :columns="dataDetails.data.data_preview.columns"
                  :data="dataDetails.data.data_preview.data"
                  border
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  </Row>
  <Row v-if="code404" justify="center">
    <Col class-name="center">
      <Exception type="404" img-color />
    </Col>
  </Row>
</template>
<script setup>
import { getCurrentInstance, ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { getDataDetail, addToCart } from "@/api/index";
import { Message } from "view-ui-plus";
import { agencyStr } from "@/axiosConfig/enviromentConfig";
import { useForm, useState, userPlayListAudio } from "@/hook/index";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { FreeMode, Autoplay } from "swiper";

import "swiper/swiper.css";
import "swiper/css/free-mode";
import "swiper/css/a11y";
import "swiper/css/autoplay";
const [modules, setModules] = useState([FreeMode, Autoplay]);
SwiperCore.use(modules);

const route = useRoute();
const data_id = route.params.data_id;
const dataDetails = ref(null);
const [code404, setCode404] = useState(false);
const [formRef, AppliForm, resetForm, validateForm] = useForm({
  data_id: data_id,
  item: [],
});

//计算总金额
const [amount, setAmount] = useState(0);

watch(AppliForm, (newVal, oldVal) => {
  //计算总金额
  let sum = 0;
  newVal.item.forEach((item) => {
    if (dataDetails.value.data) {
      sum += item.num * dataDetails.value.data.data_per_price;
    }
  });
  setAmount(sum);
});

const convertToString = (item) => {
  if (dataDetails.value.data.data_type === "图片") {
    return (
      item.dpi + "dpi, 大小 " + item.width + " x " + item.height + " px的图片"
    );
  } else if (dataDetails.value.data.data_type === "文本") {
    return "文本数据";
  } else if (dataDetails.value.data.data_type === "结构化") {
    return "购买的属性：" + AppliForm.item.item.join(" | ");
  } else if (dataDetails.value.data.data_type === "视频") {
    return `清晰度${item.title}，${item.fps}帧/秒`;
  } else if (dataDetails.value.data.data_type === "音频") {
    return `音质${item.title}`;
  }
};

//音频播放
const [
  audioList,
  setAudioList,
  currentAudioIndex,
  setCurrentAudioIndex,
  handlePlay,
  handlePlayPrev,
  handlePlayNext,
  handleTagClose,
  handleTagClick,
] = userPlayListAudio(null);

onMounted(() => {
  //加载详细数据
  loadData();
});

const loadData = () => {
  let params = `?data_id=${data_id}`;
  getDataDetail(params).then((res) => {
    if (res.data.code === 0) {
      setCode404(true);
      Message.error(res.data.msg);
    } else {
      setCode404(false);
      dataDetails.value = res.data.data;
      let form = {
        data_id: data_id,
        item: [],
      };
      //初始化表单
      let data = res.data.data.data;
      if (["文本", "结构化"].indexOf(data.data_type) > -1) {
        form.item.push({ item: [], num: 0 });
      } else if (["图片".indexOf(data.data_type) > -1]) {
        form.item = data.data_attr.num.map((item) => {
          return { item, num: 0 };
        });
      } else if (["视频", "音频"].indexOf(data.data_type) > -1) {
        form.item = data.data_attr.num.map((item) => {
          return { item, num: 0 };
        });
      }
      AppliForm.item = form.item;
      if (dataDetails.value.data.data_type === "音频") {
        setAudioList(
          dataDetails.value.data.data_preview.sample.map((item) => {
            return agencyStr + "/file" + item;
          })
        );
      }
    }
  });
};

const addCart = () => {
  let params = {
    data_id: AppliForm.data_id,
    item: { item: AppliForm.item },
  };
  addToCart(params).then((res) => {
    console.log(res);
    if (res.data.code === 0) {
      Message.error(res.data.msg);
    } else {
      Message.success(res.data.msg);
    }
  });
};
</script>

<style lang="scss" scoped>
.center {
  padding: 20px 0 12px 0;
  width: 1226px;
  min-width: 865px;
  .good {
    width: 100%;
  }
  .good-img {
    width: 50%;
    img {
      width: 91.3%;
    }
  }
  .data-base-info {
    width: 100%;
    padding-left: 20px;
    .title {
      font-size: 24px;
      font-weight: 400;
      color: #212121;
      :deep(.ivu-divider-horizontal) {
        margin: 12px 0 12px 0;
      }
    }
    .desc {
      font-size: 14px;
      color: #b0b0b0;
      padding-top: 8px;
    }
    .seller {
      font-size: 14px;
      color: #ff6700;
      padding-top: 14px;
    }
    .price {
      font-size: 18px;
      color: #ff6700;
      padding: 12px 0 10px 0;
    }
  }
  .spec {
    .sub-title {
      padding-bottom: 10px;
      font-size: 18px;
      color: #333;
    }
    padding-left: 20px;
    .num {
      margin-top: 10px;
    }
    .num:first-of-type {
      margin-top: 0;
    }
    .max {
      outline: none;
      border: none;
      color: #007aff;
    }
    :deep(.ivu-btn) {
      border: none;
      color: #007aff;
      outline: none;
    }
  }
  .sum {
    padding-left: 20px;
    .sub-title {
      padding-bottom: 10px;
      font-size: 18px;
      color: #333;
    }
    .item {
      margin-bottom: 10px;
      .item-desc {
        text-indent: 2rem;
      }
      .item-num,
      .item-amount {
        text-align: right;
      }
    }
    .price {
      font-size: 24px;
      color: #ff6700;
    }
  }
  .action {
    padding-left: 20px;
    margin-top: 20px;
    .addCart {
      border-radius: 0 0 0 0;
      background-color: #ff6700;
      height: 52px;
      color: #fff;
      border-color: #ff6700;
      line-height: 52px;
      font-size: 16px;
      transition: all 0.2s linear;
    }
    .addCart:hover {
      background-color: rgb(242, 88, 7);
      transition: all 0.2s linear;
    }
  }
  .details {
    .table-title {
      font-size: 20px;
      color: #212121;
      margin-bottom: 20px;
    }
    .table-row {
      .table-cell {
        color: #b0b0b0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px 5px;
        font-size: 16px;
        border-left: 1px solid #b0b0b0;
        border-top: 1px solid #b0b0b0;
      }
      .table-right {
        justify-content: left;
        border-right: 1px solid #b0b0b0;
      }
      .table-bottom {
        border-bottom: 1px solid #b0b0b0;
      }
    }
  }
  .sample {
    .table-title {
      font-size: 20px;
      color: #212121;
      margin-bottom: 20px;
    }
    .mySwiper {
      img {
        width: 306.5px;
      }
      :deep(.swiper-wrapper) {
        -webkit-transition-timing-function: linear;
        -moz-transition-timing-function: linear;
        -ms-transition-timing-function: linear;
        -o-transition-timing-function: linear;
        transition-timing-function: linear;
        margin: 0 auto;
      }
    }
    .tag-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .audio-tag {
        cursor: pointer;
      }
    }
    .prompt {
      padding-bottom: 10px;
      font-size: 16px;
    }
    .audio-player {
      width: 613px;
      margin-top: 20px;
    }
    .player-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5px;
      :deep(.vjs-big-play-button) {
        top: 50px;
        left: 106px;
      }
    }
  }
}
.continer {
  padding-bottom: 30px;
  background-color: #f5f5f5;
}
</style>