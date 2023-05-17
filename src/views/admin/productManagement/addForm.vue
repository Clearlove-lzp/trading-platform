<template>
  <Modal
    v-model="modalVisible"
    :title="AppliForm.id ? '编辑' : '新增'"
    width="800px"
    class-name="vertical-center-modal"
    :mask-closable="false"
    @on-cancel="modalCancel"
    @on-visible-change="visibleChange"
  >
    <div class="content">
      <Form
        ref="formRef"
        class="cdp-form"
        :rules="ruleValidate"
        :model="AppliForm"
        :label-width="120"
      >
        <FormItem label="数据名称" prop="data_name">
          <Input class="cdp-input" v-model="AppliForm.data_name"></Input>
        </FormItem>
        <FormItem label="数据描述" prop="data_intro">
          <Input
            class="cdp-input"
            v-model="AppliForm.data_intro"
            type="textarea"
            :autosize="{ minRows: 3 }"
          ></Input>
        </FormItem>
        <FormItem label="售卖方式" prop="data_use">
          <RadioGroup v-model="AppliForm.data_use">
            <Radio label="数据产品">数据产品</Radio>
            <Radio label="数据服务">数据服务</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="数据类型" prop="data_type">
          <RadioGroup v-model="AppliForm.data_type">
            <Radio label="图片">图片</Radio>
            <Radio label="文本">文本</Radio>
            <Radio label="结构化">结构化</Radio>
            <Radio label="音频">音频</Radio>
            <Radio label="视频">视频</Radio>
            <Radio label="其它">其它</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="使用场景" prop="data_field">
          <RadioGroup v-model="AppliForm.data_field">
            <Radio label="经济建设">经济建设</Radio>
            <Radio label="道路交通">道路交通</Radio>
            <Radio label="环境资源">环境资源</Radio>
            <Radio label="教育科技">教育科技</Radio>
            <Radio label="文化休闲">文化休闲</Radio>
            <Radio label="城市管理">城市管理</Radio>
            <Radio label="机构团体">机构团体</Radio>
            <Radio label="民生服务">民生服务</Radio>
            <Radio label="地理空间">地理空间</Radio>
            <Radio label="气象气候">气象气候</Radio>
            <Radio label="其它">其它</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="图片格式"
          prop="image_format"
          v-if="AppliForm.data_type === '图片'"
        >
          <RadioGroup v-model="AppliForm.image_format">
            <Radio label="bmp">bmp</Radio>
            <Radio label="jpeg">jpeg</Radio>
            <Radio label="png">png</Radio>
            <Radio label="gif">gif</Radio>
            <Radio label="混合">混合</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="图片数量"
          prop="_data_num"
          v-if="AppliForm.data_type === '图片'"
        >
          <Input
            v-model="AppliForm._data_num"
            disabled
            readonly
            style="visibility: hidden; display: none"
          />
          <template v-for="(item, index) in AppliForm.data_num" :key="index">
            <InputNumber :min="0" v-model="item.dpi"></InputNumber
            >&nbsp;dpi&nbsp;&nbsp;
            <InputNumber :min="0" v-model="item.num"></InputNumber
            >&nbsp;张&nbsp;&nbsp;
            <InputNumber :min="0" v-model="item.width"></InputNumber
            >&nbsp;平均宽度(像素)&nbsp;&nbsp;
            <InputNumber :min="0" v-model="item.height"></InputNumber
            >&nbsp;平均高度(像素)&nbsp;&nbsp;
          </template>
          <Button @click="addNum" shape="circle" icon="md-add"></Button>
        </FormItem>
        <FormItem
          label="文本语言"
          prop="text_language"
          v-if="AppliForm.data_type === '文本'"
        >
          <Select v-model="AppliForm.text_language">
            <Option value="中文">中文</Option>
            <Option value="英语">英语</Option>
            <Option value="法语">法语</Option>
            <Option value="德语">德语</Option>
            <Option value="印度语">印度语</Option>
            <Option value="其它">其它</Option>
          </Select>
        </FormItem>
        <FormItem
          label="文本平均长度"
          prop="text_avg_len"
          v-if="AppliForm.data_type === '文本'"
        >
          <InputNumber
            class="cdp-input"
            v-model="AppliForm.text_avg_len"
            :min="0"
            controls-outside
          ></InputNumber>
        </FormItem>
        <FormItem
          label="属性个数"
          prop="attr_num"
          v-if="AppliForm.data_type === '结构化'"
        >
          <InputNumber
            class="cdp-input"
            v-model="AppliForm.attr_num"
            :min="0"
            controls-outside
          ></InputNumber>
        </FormItem>
        <FormItem
          label="数据数量"
          prop="num"
          v-if="['结构化', '文本', '其他'].indexOf(AppliForm.data_type) > -1"
        >
          <InputNumber
            class="cdp-input"
            controls-outside
            :min="0"
            v-model="AppliForm.num"
          ></InputNumber>
        </FormItem>
        <FormItem
          label="音频数量"
          prop="_quality_num"
          v-if="AppliForm.data_type === '音频'"
        >
          <Input
            v-model="AppliForm._quality_num"
            disabled
            readonly
            style="visibility: hidden; display: none"
          />
          <template
            v-for="(item, index) in AppliForm.audio_quality_num"
            :key="index"
          >
            <Tooltip max-width="300" placement="top">
              <span>{{ item.title }}&nbsp;</span>
              <template #content>
                <p>{{ audioTooltip[index] }}</p>
              </template>
            </Tooltip>
            <InputNumber :min="0" v-model="item.num"></InputNumber
            >&nbsp;&nbsp;&nbsp;
          </template>
        </FormItem>
        <FormItem
          label="视频数量"
          prop="_quality_num"
          v-if="AppliForm.data_type === '视频'"
        >
          <Input
            v-model="AppliForm._quality_num"
            disabled
            readonly
            style="visibility: hidden; display: none"
          />
          <template
            v-for="(item, index) in AppliForm.video_quality_num"
            :key="index"
          >
            <Row v-if="index % 2 === 0">
              <Col span="12">
                <Tooltip max-width="300" placement="top">
                  <span
                    style="
                      display: inline-block;
                      width: 50px;
                      text-align: right;
                    "
                    >{{ item.title }}&nbsp;</span
                  >
                  <template #content>
                    <p>{{ videoTooltip[index] }}</p>
                  </template>
                </Tooltip>
                <InputNumber :min="0" v-model="item.fps"></InputNumber
                >&nbsp;帧率&nbsp;&nbsp;
                <InputNumber :min="0" v-model="item.num"></InputNumber
                >&nbsp;个数&nbsp;&nbsp;
              </Col>
              <Col
                span="12"
                v-if="index < AppliForm.video_quality_num.length - 1"
              >
                <Tooltip max-width="300" placement="top">
                  <span
                    style="
                      display: inline-block;
                      width: 50px;
                      text-align: right;
                    "
                    >{{
                      AppliForm.video_quality_num[index + 1].title
                    }}&nbsp;</span
                  >
                  <template #content>
                    <p>{{ videoTooltip[index + 1] }}</p>
                  </template>
                </Tooltip>
                <InputNumber
                  :min="0"
                  v-model="AppliForm.video_quality_num[index + 1].fps"
                ></InputNumber
                >&nbsp;帧率&nbsp;&nbsp;
                <InputNumber
                  :min="0"
                  v-model="AppliForm.video_quality_num[index + 1].num"
                ></InputNumber
                >&nbsp;个数&nbsp;&nbsp;
              </Col>
            </Row>
          </template>
        </FormItem>
        <FormItem label="单位数据价格" prop="data_per_price">
          <InputNumber
            class="cdp-input"
            v-model="AppliForm.data_per_price"
            :min="0"
            controls-outside
          ></InputNumber>
        </FormItem>
        <FormItem label="是否上架" prop="data_status">
          <i-switch
            v-model="AppliForm.data_status"
            :true-value="true"
            :false-value="false"
            true-color="#13ce66"
            false-color="#ff4949"
          >
            <template #open>
              <span>是</span>
            </template>
            <template #close>
              <span>否</span>
            </template>
          </i-switch>
        </FormItem>
        <FormItem label="数据图片" prop="data_pic">
          <Input
            class="cdp-input"
            v-model="AppliForm.data_pic"
            style="display: none"
          ></Input>
          <div
            class="demo-upload-list"
            v-for="(item, index) in defaultList"
            :key="index"
          >
            <img v-lazy="item.url" v-show="item.url" :alt="item.name" />
            <div class="demo-upload-list-cover">
              <Icon
                type="ios-eye-outline"
                title="查看图片"
                @click="handleView(index, '数据图片')"
              ></Icon>
              <Icon
                type="ios-trash-outline"
                title="删除图片"
                @click="handleRemove(index, '数据图片')"
              ></Icon>
            </div>
          </div>
          <Upload
            ref="uploadRef"
            :data="{ type: 'dataFace' }"
            :action="uploadAction"
            v-if="!defaultList.length"
            :show-upload-list="false"
            :format="['jpg', 'jpeg', 'png']"
            accept=".jpg,.jpeg,.png"
            :max-size="10240"
            :on-success="handleSucFunc"
            :on-error="handleErrFunc"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :default-file-list="defaultList"
            type="drag"
            style="display: inline-block; width: 78px"
          >
            <div style="width: 78px; height: 78px; line-height: 78px">
              <Icon type="ios-image" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem
          label="数据样例"
          v-if="['图片', '音频', '视频'].indexOf(AppliForm.data_type) > -1"
        >
          <!-- 图片样例的展示 -->
          <template v-if="AppliForm.data_type === '图片'">
            <div
              class="demo-upload-list"
              v-for="(item, index) in defaultList2"
              :key="index"
            >
              <img v-lazy="item.url" v-show="item.url" :alt="item.name" />
              <div class="demo-upload-list-cover">
                <Icon
                  type="ios-eye-outline"
                  title="查看图片"
                  @click="handleView(index, '数据样例')"
                ></Icon>
                <Icon
                  type="ios-trash-outline"
                  title="删除图片"
                  @click="handleRemove(index, '数据样例')"
                ></Icon>
              </div>
            </div>
          </template>
          <!-- 视频样例的展示 -->
          <template v-if="AppliForm.data_type === '视频'">
            <div class="player-container">
              <video-player
                v-for="(item, index) in defaultList2"
                :key="index"
                class="video-palyer"
                :width="150"
                muted
                :src="item.url"
                :loop="false"
                :volume="0.1"
                @click="
                  ($event) => {
                    $event.target.paused
                      ? $event.target.play()
                      : $event.target.pause();
                  }
                "
              />
            </div>
          </template>
          <!-- 音频样例展示 -->
          <template v-if="AppliForm.data_type === '音频'">
            <div class="tag-container">
              <Tag
                class="audio-tag"
                v-for="(item, index) in audioList"
                :key="index"
                type="border"
                @click="handleTagClick(index, $refs.audioPlayer)"
                @on-close="
                  handleTagClose(index), handleRemove(index, '数据样例')
                "
                closable
                :color="currentAudioIndex === index ? 'blue' : '#000'"
              >
                {{ item.split("/").at(-1) }}
              </Tag>
            </div>
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
          </template>
          <Upload
            ref="uploadRef2"
            :data="{ type: 'sample' }"
            :action="uploadAction2"
            :show-upload-list="false"
            :format="sample_format"
            :accept="sample_accept"
            :max-size="10240"
            multiple
            :on-success="handleSucFunc2"
            :on-error="handleErrFunc2"
            :on-format-error="handleFormatError2"
            :on-exceeded-size="handleMaxSize2"
            :default-file-list="defaultList2"
            type="drag"
            style="display: inline-block; width: 78px"
          >
            <div style="width: 78px; height: 78px; line-height: 78px">
              <Icon
                v-if="AppliForm.data_type === '图片'"
                type="ios-image"
                size="20"
              ></Icon>
              <Icon
                v-else-if="AppliForm.data_type === '音频'"
                type="ios-musical-notes"
                size="20"
              ></Icon>
              <Icon
                v-else-if="AppliForm.data_type === '视频'"
                type="ios-videocam"
                size="20"
              ></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem
          label="数据样例"
          v-if="['文本', '结构化'].indexOf(AppliForm.data_type) > -1"
        >
          <TablePaste
            :value="modelValue"
            height="50"
            hide-table
            :input-props="inputProps"
            :table-props="tableProps"
            @on-success="handleSuccess"
            @on-error="handleError"
          >
            <Input
              v-model="modelValue"
              type="textarea"
              :placeholder="inputProps.placeholder"
            />
          </TablePaste>
          <Table
            size="small"
            height="200"
            :columns="tableColumns"
            :data="tableDatas"
            border
          />
        </FormItem>
      </Form>
    </div>
    <template #footer>
      <div style="text-align: center">
        <Button @click="modalCancel">取消</Button>
        <Button type="primary" :loading="loading" @click="modalOK">确定</Button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import {
  useForm,
  useState,
  useUserInfo,
  useUpload,
  useTablePaste,
  userPlayListAudio,
  useViewer,
} from "@/hook/index";
import { Message } from "view-ui-plus";
import { toRef, watch, computed } from "vue";
import {
  datasetAdd,
  uploadFile,
  uploadSample,
  datasetUpdate,
  datasetGetDetail,
} from "@/api/index";
import moment from "moment";
import { agencyStr } from "@/axiosConfig/enviromentConfig.js";

//计算属性生明
const sample_format = computed(() => {
  if (AppliForm.data_type === "图片") {
    return [
      "jpeg",
      "bmp",
      "jpg",
      "png",
      "tif",
      "gif",
      "pcx",
      "tga",
      "exif",
      "fpx",
      "svg",
      "psd",
      "cdr",
      "pcd",
      "dxf",
      "ufo",
      "eps",
      "ai",
      "raw",
      "WMF",
      "webp",
      "avif",
      "apng",
    ];
  } else if (AppliForm.data_type === "音频") {
    return [
      "mp3",
      "wav",
      "wma",
      "mp2",
      "flac",
      "midi",
      "ra",
      "ape",
      "acc",
      "cda",
      "mov",
      "ogg",
    ];
  } else if (AppliForm.data_type === "视频") {
    return [
      "avi",
      "wmv",
      "mpg",
      "mov",
      "rm",
      "ram",
      "swf",
      "flv",
      "mp4",
      "asf",
      "mpeg",
      "mpg",
      "dat",
    ];
  } else {
    return [];
  }
});
const sample_accept = computed(() => {
  return "." + sample_format.value.join(",.");
});

const ruleValidate = {
  data_name: [{ required: true, message: "数据名称不能为空" }],
  data_intro: [{ required: true, message: "数据描述不能为空" }],
  data_use: [{ required: true, message: "售卖方式不能为空" }],
  data_type: [{ required: true, message: "数据类型不能为空" }],
  data_field: [{ required: true, message: "使用场景不能为空" }],
  image_format: [{ required: true, message: "图片格式不能为空" }],
  text_language: [{ required: true, message: "文本语言不能为空" }],
  text_avg_len: [{ required: true, message: "文本平均长度不能为空" }],
  attr_num: [{ required: true, message: "属性个数不能为空" }],
  video_quality: [{ required: true, message: "视频质量不能为空" }],
  audio_quality: [{ required: true, message: "音频质量不能为空" }],
  data_per_price: [
    { required: true, type: "number", message: "单位数据价格不能为空" },
  ],
  data_status: [{ required: true, message: "是否上架不能为空" }],
  data_pic: [{ required: true, message: "数据图片不能为空" }],
  _data_num: [{ required: true, message: "数据数量不能为空" }],
  num: [{ required: true, message: "文本数量不能为空" }],
  _quality_num: [{ required: true, message: "文本数量不能为空" }],
};

const props = defineProps({
  detailInfo: {
    type: Object,
    default: () => {},
  },
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["closeModal", "updateList"]);

const modalVisible = toRef(props, "visible");
const { userInfo } = useUserInfo();
const [
  uploadRef,
  uploadAction,
  defaultList,
  setDefaultlist,
  showUploadBtn,
  hideUploadBtn,
  visibleUploadBtn,
  handleSucFunc,
  handleErrFunc,
  _,
  handleFormatError,
  handleMaxSize,
  clearFiles,
] = useUpload(uploadFile);
const [
  uploadRef2,
  uploadAction2,
  defaultList2,
  setDefaultlist2,
  showUploadBtn2,
  hideUploadBtn2,
  visibleUploadBtn2,
  handleSucFunc2,
  handleErrFunc2,
  __,
  handleFormatError2,
  handleMaxSize2,
  clearFiles2,
] = useUpload(uploadSample);
const [
  modelValue,
  setModelVule,
  inputProps,
  setInputPros,
  tableProps,
  setTablePros,
  tableDatas,
  setTableDatas,
  tableColumns,
  setTableColumns,
  handleSuccess,
  handleError,
] = useTablePaste("");

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

const [audioTooltip, setAudioTooltip] = useState([
  "无损音质是指音频在录制、传输和存储过程中没有经过任何压缩和编码，保留了原始音频的所有信息和细节。常见的无损音频格式有FLAC、ALAC、WAV等。",
  "高码率有损音质是指音频在编码过程中采用高比特率的压缩算法，使得压缩后的音频质量相对原始音频有所损失，但仍然保持了较高的音质。常见的高码率有损音频格式有MP3（320kbps）、AAC（256kbps）等。",
  "中码率有损音质是指音频在编码过程中采用中等比特率的压缩算法，使得压缩后的音频质量相对原始音频有明显的损失，但仍然保持了较为清晰的音质。常见的中码率有损音频格式有MP3（128kbps）、AAC（128kbps）等。",
  "低码率有损音质是指音频在编码过程中采用较低比特率的压缩算法，使得压缩后的音频质量明显下降，有明显的失真和噪声。常见的低码率有损音频格式有MP3（64kbps以下）、AAC（64kbps以下）等。",
]);
const [videoTooltip, setVideoTooltip] = useState([
  "4K视频是指分辨率达到3840x2160像素的视频，具有极高的清晰度和细节表现能力。4K视频需要高性能的设备支持，通常用于电影、电视剧等高端视频制作领域。",
  "1080P视频是指分辨率达到1920x1080像素的视频，具有较高的清晰度和细节表现能力，是普通消费者使用最广泛的视频质量等级。",
  "720P视频是指分辨率达到1280x720像素的视频，虽然分辨率比1080P低，但仍然具有较高的清晰度和流畅度。",
  "480P视频是指分辨率达到720x480像素的视频，是较为常见的标清视频质量等级。",
  "360P视频是指分辨率达到640x360像素的视频，是较为常见的低清晰度视频质量等级",
]);
// 表单
const form = {
  data_id: "",
  data_name: "",
  data_intro: "",
  data_use: "",
  data_type: "",
  data_field: "",
  image_format: "",
  text_language: "",
  text_avg_len: 0,
  attr_num: 0,
  quality: "",
  data_per_price: 0,
  data_status: true,
  data_pic: "",
  data_preview: "",
  data_num: [{ dpi: 32, num: 0, width: 0, height: 0 }], //图片数目
  num: 0, //文本、结构化数目
  audio_quality_num: [
    { title: "无损音质", num: 0 },
    { title: "高码率", num: 0 },
    { title: "中码率", num: 0 },
    { title: "低码率", num: 0 },
  ],
  video_quality_num: [
    { title: "4k", num: 0, fps: 0 },
    { title: "1080p", num: 0, fps: 0 },
    { title: "720p", num: 0, fps: 0 },
    { title: "480p", num: 0, fps: 0 },
    { title: "360p", num: 0, fps: 0 },
  ],
  //虚拟变量
  _data_num: 0,
  _quality_num: 0,
};
const [formRef, AppliForm, resetForm, validateForm] = useForm(form);

const addNum = () => {
  AppliForm.data_num.push({ dpi: 32, num: 0, width: 0, height: 0 });
};

const handleRemove = (index, label) => {
  if (label === "数据图片") {
    defaultList.value.splice(index, 1);
  }
  if (label === "数据样例") {
    defaultList2.value.splice(index, 1);
    console.log(defaultList2);
  }
};

const { viewerApi } = useViewer();
const handleView = (index, label) => {
  if (label === "数据图片") {
    viewerApi({
      options: {
        initialViewIndex: index,
        url: "url",
      },
      images: defaultList.value,
    });
  }
  if (label === "数据样例") {
    viewerApi({
      options: {
        initialViewIndex: index,
        url: "url",
      },
      images: defaultList2.value,
    });
  }
};

const modalCancel = () => {
  // 点击取消
  setDefaultlist([]);
  resetForm(true);
  emit("closeModal");
};

const [loading, setLoading] = useState(false);
const modalOK = async () => {
  //点击确定
  let boolean = await validateForm();
  if (!boolean) {
    return Message.error("请填写完整");
  }
  let params = {
    data_name: AppliForm.data_name,
    data_intro: AppliForm.data_intro,
    data_use: AppliForm.data_use,
    data_type: AppliForm.data_type,
    data_field: AppliForm.data_field,
    image_format: AppliForm.image_format,
    text_language: AppliForm.text_language,
    text_avg_len: AppliForm.text_avg_len,
    attr_num: AppliForm.attr_num,
    data_per_price: AppliForm.data_per_price,
    data_status: AppliForm.data_status,
    data_id: AppliForm.data_id,
    data_pic: AppliForm.data_pic,
    data_preview: AppliForm.data_preview,
    data_num:
      AppliForm.data_type === "图片"
        ? AppliForm.data_num
        : AppliForm.data_type === "音频"
        ? AppliForm.audio_quality_num
        : AppliForm.data_type === "视频"
        ? AppliForm.video_quality_num
        : [{}],
    num: AppliForm.num,
  };
  setLoading(true);
  let func = AppliForm.data_id ? datasetUpdate : datasetAdd;
  func(params).then(
    (res) => {
      setLoading(false);
      if (res.data.code === 1) {
        modalCancel();
        emit("updateList");
        Message.success(res.data.msg);
      } else {
        Message.error(res.data.msg);
      }
    },
    (err) => {
      setLoading(false);
    }
  );
};

const queryDetail = async () => {
  //清除之前的表单状态
  AppliForm.value = form;
  setDefaultlist([]);
  setDefaultlist2([]);

  let result = {};
  if (props.detailInfo.data_id) {
    let params = `?data_id=${props.detailInfo.data_id}`;
    const res = await datasetGetDetail(params);
    if (res.data.code === 1) result = res.data.data;
  }
  AppliForm.data_id = result.data_id ? result.data_id : "";
  AppliForm.data_name = result.data_name ? result.data_name : "";
  AppliForm.data_intro = result.data_intro ? result.data_intro : "";
  AppliForm.data_use = result.data_use ? result.data_use : "";
  AppliForm.data_type = result.data_type ? result.data_type : "";
  AppliForm.data_field = result.data_field ? result.data_field : "";
  AppliForm.image_format = result.image_format ? result.image_format : "";
  AppliForm.text_language = result.text_language ? result.text_language : "";
  AppliForm.text_avg_len = result.text_avg_len ? result.text_avg_len : 0;
  AppliForm.attr_num = result.attr_num ? result.attr_num : 0;
  AppliForm.data_per_price = result.data_per_price ? result.data_per_price : 0;
  AppliForm.data_status = result.data_status ? result.data_status : false;
  AppliForm.data_pic = result.data_pic ? result.data_pic : "";
  AppliForm.data_preview = result.data_preview ? result.data_preview : {};
  if (result.data_pic) {
    defaultList.value.push({
      name: "image",
      url: agencyStr + "/file" + result.data_pic,
      filePath: result.data_pic,
    });
  }
  //设置表单数据个数
  if (
    result.data_attr &&
    result.data_attr.num &&
    ["结构化", "文本"].indexOf(result.data_type) > -1
  ) {
    AppliForm.num = result.data_attr.num;
  }
  if (
    result.data_attr &&
    result.data_attr.num &&
    ["图片", "视频", "音频"].indexOf(result.data_type) > -1
  ) {
    if (result.data_type === "图片") {
      AppliForm.data_num = result.data_attr.num;
    } else if (result.data_type === "视频") {
      AppliForm.video_quality_num = result.data_attr.num;
    } else if (result.data_type === "音频") {
      AppliForm.audio_quality_num = result.data_attr.num;
    }
  }
  //设置defaultList2
  if (result.data_preview && result.data_preview["sample"]) {
    //设置视频音频默认值
    setDefaultlist2(
      AppliForm.data_preview["sample"].map((x) => {
        return {
          name: AppliForm.data_type,
          url: agencyStr + "/file" + x,
          filePath: x,
        };
      })
    );
  } else if (result.data_preview && result.data_preview["modelValue"]) {
    //设置文本、结构化默认值
    setModelVule(result.data_preview["modelValue"]);
  } else {
    setDefaultlist2([]);
  }
};

watch(
  defaultList,
  (newValue, oldValue) => {
    if (newValue && newValue.length) {
      AppliForm.data_pic = newValue.map((x) => x.filePath).join(",");
    } else {
      AppliForm.data_pic = "";
    }
  },
  {
    deep: true,
  }
);
//图片数据样例监视器
watch(
  defaultList2,
  (newValue, oldValue) => {
    if (newValue && newValue.length) {
      AppliForm.data_preview = { sample: newValue.map((x) => x.filePath) };
      if (AppliForm.data_type === "音频") {
        setAudioList(newValue.map((x) => x.url));
      }
    } else {
      //当defaultList2没有值时,清空
      AppliForm.data_preview = {};
      setAudioList([]);
    }
  },
  {
    deep: true,
  }
);
//文本，结构变化数据样例监视器
watch(
  tableDatas,
  (newValue, oldValue) => {
    if (newValue) {
      AppliForm.data_preview = {
        data: tableDatas.value,
        columns: tableColumns.value,
        modelValue: modelValue.value,
      };
    } else {
      AppliForm.data_preview = { data: [], columns: [] };
    }
  },
  { deep: true }
);

const visibleChange = (value) => {
  if (value) {
    // 打开模态框执行
    queryDetail();
  }
};
</script>

<style scoped lang="less">
:deep(.vertical-center-modal) {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
    .ivu-modal-content {
      .ivu-modal-header {
        padding: 10px;
      }
      .ivu-modal-body {
        padding: 10px;
      }
      .ivu-modal-footer {
        padding: 10px;
      }
    }
  }
}

.video-palyer {
  cursor: pointer;
}

.player-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cdp-input {
  width: 100%;
}

.demo-upload-list {
  display: inline-block;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

.audio-tag {
  cursor: pointer;
}
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
