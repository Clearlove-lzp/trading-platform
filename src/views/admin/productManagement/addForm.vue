<template>
  <Modal v-model="modalVisible" :title="AppliForm.id ? '编辑' : '新增'" width="550px"
    class-name="vertical-center-modal" :mask-closable="false" @on-cancel="modalCancel"
    @on-visible-change="visibleChange">
    <div class="content">
      <Form ref="formRef" class="cdp-form" :rules="ruleValidate" :model="AppliForm" :label-width="120">
        <FormItem label="数据名称" prop="data_name">
          <Input class="cdp-input" v-model="AppliForm.data_name"></Input>
        </FormItem>
        <FormItem label="数据描述" prop="data_intro">
          <Input class="cdp-input" v-model="AppliForm.data_intro" type="textarea" :autosize="{minRows: 3}"></Input>
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
        
        <FormItem label="图片格式" prop="image_format" v-if="AppliForm.data_type === '图片'">
          <RadioGroup v-model="AppliForm.image_format">
            <Radio label="bmp">bmp</Radio>
            <Radio label="jpeg">jpeg</Radio>
            <Radio label="png">png</Radio>
            <Radio label="gif">gif</Radio>
            <Radio label="混合">混合</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="文本语言" prop="text_language" v-if="AppliForm.data_type === '文本'">
          <Select v-model="AppliForm.text_language">
            <Option value="中文">中文</Option>
            <Option value="英语">英语</Option>
            <Option value="法语">法语</Option>
            <Option value="德语">德语</Option>
            <Option value="印度语">印度语</Option>
            <Option value="其它">其它</Option>
          </Select>
        </FormItem>
        <FormItem label="文本平均长度" prop="text_avg_len" v-if="AppliForm.data_type === '文本'">
          <InputNumber class="cdp-input" v-model="AppliForm.text_avg_len" :min="0" controls-outside></InputNumber>
        </FormItem>
        <FormItem label="属性个数" prop="attr_num" v-if="AppliForm.data_type === '结构化'">
          <InputNumber class="cdp-input" v-model="AppliForm.attr_num" :min="0" controls-outside></InputNumber>
        </FormItem>
        <FormItem label="音频质量" prop="quality" v-if="AppliForm.data_type === '音频'">
          <RadioGroup v-model="AppliForm.quality">
            <Radio label="高品质">高品质</Radio>
            <Radio label="标准">标准</Radio>
            <Radio label="无损">无损</Radio>
            <Radio label="混合">混合</Radio>
          </RadioGroup>
        </FormItem>
         <FormItem label="视频清晰度" prop="quality" v-if="AppliForm.data_type === '视频'">
          <RadioGroup v-model="AppliForm.quality">
            <Radio label="超清">超清</Radio>
            <Radio label="高清">高清</Radio>
            <Radio label="标清">标清</Radio>
            <Radio label="流畅">流畅</Radio>
            <Radio label="混合">混合</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="单位数据价格" prop="data_per_price">
          <InputNumber class="cdp-input" v-model="AppliForm.data_per_price" :min="0" controls-outside></InputNumber>
        </FormItem>
        <FormItem label="是否上架" prop="data_status">
          <i-switch v-model="AppliForm.data_status" :true-value="true" :false-value="false" true-color="#13ce66" false-color="#ff4949">
            <span slot="open">上架</span>
            <span slot="close">下架</span>
          </i-switch>
        </FormItem>
        <FormItem label="数据图片" prop="data_pic">
          <Upload ref="uploadRef" :data="{type: 'dataFace'}" :action="uploadAction"
            :format="['jpg', 'jpeg', 'png']"
            accept=".jpg,.jpeg,.png"
            :max-size="10240"
            :on-success="handleSucFunc" :on-error="handleErrFunc"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-remove="handleRemove" :default-file-list="defaultList">
            <Button icon="ios-cloud-upload-outline">点击上传</Button>
          </Upload>
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
import { useForm, useState, useUserInfo, useUpload } from '@/hook/index'
import { Message } from "view-ui-plus";
import { toRef, computed } from "vue";
import { datasetUpdate, uploadFile } from '@/api/index';
import moment from 'moment';

const ruleValidate = {
  data_name: [
    { required: true, message: '数据名称不能为空'}
  ],
  data_intro: [
    { required: true, message: '数据描述不能为空'}
  ],
  data_use: [
    { required: true, message: '售卖方式不能为空'}
  ],
  data_type: [
    { required: true, message: '数据类型不能为空'}
  ],
  data_field: [
    { required: true, message: '使用场景不能为空'}
  ],
  image_format: [
    { required: true, message: '图片格式不能为空'}
  ],
  text_language: [
    { required: true, message: '文本语言不能为空'}
  ],
  text_avg_len: [
    { required: true, message: '文本平均长度不能为空'}
  ],
  attr_num: [
    { required: true, message: '属性个数不能为空'}
  ],
  quality: [
    { required: true, message: '音频/视频质量不能为空'}
  ],
  data_per_price: [
    { required: true, type: 'number', message: '单位数据价格不能为空'}
  ],
  data_status: [
    { required: true, message: '是否上架不能为空'}
  ]
}

const props = defineProps({
  detailInfo: {
    type: Object,
    default: () => { }
  },
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['closeModal', 'updateList']);

const modalVisible = toRef(props, 'visible');
const { userInfo } = useUserInfo()
const { uploadRef, uploadAction, defaultList, handleSucFunc, handleErrFunc, handleRemove,
  handleFormatError, handleMaxSize } = useUpload(uploadFile);

// 表单
const form = {
  id: "",
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
  data_status: "是",
  createUserId: "",
  createuserName: ""
}
const [ formRef, AppliForm, resetForm, validateForm ] = useForm(form)

const modalCancel = () => { // 点击取消
  resetForm(true);
  emit('closeModal')
}

const [loading, setLoading] = useState(false)
const modalOK = async() => { //点击确定
  let boolean = await validateForm()
  if(!boolean) {
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
    quality: AppliForm.quality,
    data_per_price: AppliForm.data_per_price,
    id: AppliForm.id,
    createUserId: AppliForm.createUserId,
    createuserName: AppliForm.createuserName,
    data_pic: defaultList.value.map(x => x.filePath).join(",")
  }
  setLoading(true);
  datasetUpdate(params).then(res => {
    setLoading(false);
    if(res.data.code === 1) {
      modalCancel();
      emit('updateList');
      Message.success(res.data.msg);
    }else{
      Message.error(res.data.msg);
    }
  }, err => {
    setLoading(false);
  })
}

const visibleChange = (value) => {
  if(value) {   // 打开模态框执行
    AppliForm.id = props.detailInfo.id ? props.detailInfo.id : "";
    AppliForm.data_name = props.detailInfo.data_name ? props.detailInfo.data_name : "";
    AppliForm.data_intro = props.detailInfo.data_intro ? props.detailInfo.data_intro : "";
    AppliForm.data_use = props.detailInfo.data_use ? props.detailInfo.data_use : "";
    AppliForm.data_type = props.detailInfo.data_type ? props.detailInfo.data_type : "";
    AppliForm.data_field = props.detailInfo.data_field ? props.detailInfo.data_field : "";
    AppliForm.image_format = props.detailInfo.image_format ? props.detailInfo.image_format : "";
    AppliForm.text_language = props.detailInfo.text_language ? props.detailInfo.text_language : "";
    AppliForm.text_avg_len = props.detailInfo.text_avg_len ? props.detailInfo.text_avg_len : 0;
    AppliForm.attr_num = props.detailInfo.attr_num ? props.detailInfo.attr_num : 0;
    AppliForm.quality = props.detailInfo.quality ? props.detailInfo.quality : "";
    AppliForm.quality = props.detailInfo.quality ? props.detailInfo.quality : "";
    AppliForm.data_per_price = props.detailInfo.data_per_price ? props.detailInfo.data_per_price : 0;
    AppliForm.data_status = props.detailInfo.data_status ? props.detailInfo.data_status : true;
    // AppliForm.createUserId = props.detailInfo.createUserId ? props.detailInfo.createUserId : userInfo.userId;
    // AppliForm.createuserName = props.detailInfo.createuserName ? props.detailInfo.createuserName : userInfo.userName;
  }
}
</script>

<style scoped lang="less">
:deep(.vertical-center-modal){
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal{
    top: 0;
    .ivu-modal-content{
      .ivu-modal-header{
        padding: 10px;
      }
      .ivu-modal-body{
        padding: 10px;
      }
      .ivu-modal-footer{
        padding: 10px;
      }
    }
  }
}

.cdp-input{
  width: 100%;
}
</style>
