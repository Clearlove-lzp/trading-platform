<template>
  <Modal v-model="modalVisible" :title="AppliForm.id ? '编辑' : '新增'" width="550px"
    class-name="vertical-center-modal" :mask-closable="false" @on-cancel="modalCancel"
    @on-visible-change="visibleChange">
    <div class="content">
      <Form ref="formRef" class="cdp-form" :rules="ruleValidate" :model="AppliForm" :label-width="120">
        <FormItem label="数据名称" prop="proName">
          <Input class="cdp-input" v-model="AppliForm.proName"></Input>
        </FormItem>
        <FormItem label="数据描述" prop="desc">
          <Input class="cdp-input" v-model="AppliForm.desc" type="textarea" :autosize="{minRows: 3}"></Input>
        </FormItem>
        <FormItem label="售卖方式" prop="sell">
          <RadioGroup v-model="AppliForm.sell">
            <Radio label="数据产品">数据产品</Radio>
            <Radio label="数据服务">数据服务</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="数据类型" prop="type">
          <RadioGroup v-model="AppliForm.type">
            <Radio label="图片">图片</Radio>
            <Radio label="文本">文本</Radio>
            <Radio label="结构化">结构化</Radio>
            <Radio label="音频">音频</Radio>
            <Radio label="视频">视频</Radio>
            <Radio label="其它">其它</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="使用场景" prop="field">
          <RadioGroup v-model="AppliForm.field">
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
        
        <FormItem label="图片格式" prop="img_type" v-if="AppliForm.type === '图片'">
          <RadioGroup v-model="AppliForm.img_type">
            <Radio label="bmp">bmp</Radio>
            <Radio label="jpeg">jpeg</Radio>
            <Radio label="png">png</Radio>
            <Radio label="gif">gif</Radio>
            <Radio label="混合">混合</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="文本语言" prop="text_lang" v-if="AppliForm.type === '文本'">
          <Select v-model="AppliForm.text_lang">
            <Option value="chinese">中文</Option>
            <Option value="english">英语</Option>
            <Option value="french">法语</Option>
            <Option value="german">德语</Option>
            <Option value="hindi">印度语</Option>
            <Option value="other">其它</Option>
          </Select>
        </FormItem>
        <FormItem label="文本平均长度" prop="text_length" v-if="AppliForm.type === '文本'">
          <InputNumber class="cdp-input" v-model="AppliForm.text_length" :min="0" controls-outside></InputNumber>
        </FormItem>
        <FormItem label="属性个数" prop="structure_count" v-if="AppliForm.type === '结构化'">
          <InputNumber class="cdp-input" v-model="AppliForm.structure_count" :min="0" controls-outside></InputNumber>
        </FormItem>
        <FormItem label="音频质量" prop="audio_quality" v-if="AppliForm.type === '音频'">
          <RadioGroup v-model="AppliForm.audio_quality">
            <Radio label="高品质">高品质</Radio>
            <Radio label="标准">标准</Radio>
            <Radio label="无损">无损</Radio>
            <Radio label="混合">混合</Radio>
          </RadioGroup>
        </FormItem>
         <FormItem label="视频清晰度" prop="video_quality" v-if="AppliForm.type === '视频'">
          <RadioGroup v-model="AppliForm.video_quality">
            <Radio label="超清">超清</Radio>
            <Radio label="高清">高清</Radio>
            <Radio label="标清">标清</Radio>
            <Radio label="流畅">流畅</Radio>
            <Radio label="混合">混合</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="单位数据价格" prop="price">
          <InputNumber class="cdp-input" v-model="AppliForm.price" :min="0" controls-outside></InputNumber>
        </FormItem>
        <FormItem label="是否上架" prop="status">
          <i-switch v-model="AppliForm.status" true-value="是" false-value="否" true-color="#13ce66" false-color="#ff4949">
            <span slot="open">上架</span>
            <span slot="close">下架</span>
          </i-switch>
        </FormItem>
        <FormItem label="数据图片" prop="pic">
          <Upload action="//jsonplaceholder.typicode.com/posts/">
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

<script>
import { useForm, useState, useUserInfo } from '@/hook/index'
import { Message } from "view-ui-plus";
import { toRef, computed } from "vue";
// import { cutoverLevelLimitAdd, cutoverLevelLimitEdit } from '@/api/index';
import moment from 'moment';

const ruleValidate = {
  proName: [
    { required: true, message: '数据名称不能为空'}
  ],
  desc: [
    { required: true, message: '数据描述不能为空'}
  ],
  sell: [
    { required: true, message: '售卖方式不能为空'}
  ],
  type: [
    { required: true, message: '数据类型不能为空'}
  ],
  field: [
    { required: true, message: '使用场景不能为空'}
  ],
  img_type: [
    { required: true, message: '图片格式不能为空'}
  ],
  text_lang: [
    { required: true, message: '文本语言不能为空'}
  ],
  text_length: [
    { required: true, message: '文本平均长度不能为空'}
  ],
  structure_count: [
    { required: true, message: '属性个数不能为空'}
  ],
  audio_quality: [
    { required: true, message: '音频质量不能为空'}
  ],
  video_quality: [
    { required: true, message: '视频清晰度不能为空'}
  ],
  price: [
    { required: true, type: 'number', message: '单位数据价格不能为空'}
  ],
  status: [
    { required: true, message: '是否上架不能为空'}
  ]
}

export default {
  props: {
    detailInfo: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  setup(props, { emit }) {

    const modalVisible = toRef(props, 'visible');
    const { userInfo } = useUserInfo()

    // 表单
    const form = {
      id: "",
      proName: "",
      desc: "",
      sell: "",
      type: "",
      field: "",
      img_type: "",
      text_lang: "",
      text_length: 0,
      structure_count: 0,
      audio_quality: "",
      video_quality: "",
      price: 0,
      status: "是",
      createUserId: "",
      createuserName: ""
    }
    const [ formRef, AppliForm, resetForm, validateForm ] = useForm(form)

    const modalCancel = () => { // 点击取消
      resetForm(true);
      emit('closeModal')
    }

    const [loading, setLoading] = useState()
    const modalOK = async() => { //点击确定
      let boolean = await validateForm()
      if(!boolean) {
        return Message.error("请填写完整");
      }
      let params = {
        proName: AppliForm.proName,
        desc: AppliForm.desc,
        sell: AppliForm.sell,
        type: AppliForm.type,
        field: AppliForm.field,
        img_type: AppliForm.img_type,
        text_lang: AppliForm.text_lang,
        text_length: AppliForm.text_length,
        structure_count: AppliForm.structure_count,
        audio_quality: AppliForm.audio_quality,
        video_quality: AppliForm.video_quality,
        price: AppliForm.price,
        id: AppliForm.id,
        createUserId: AppliForm.createUserId,
        createuserName: AppliForm.createuserName
      }
      // setLoading(true);
      // let func = !AppliForm.id ? cutoverLevelLimitAdd : cutoverLevelLimitEdit
      // func(params).then(res => {
      //   setLoading(false);
      //   if(res.data.code === 200) {
      //     modalCancel();
      //     emit('updateList');
      //     Message.success(res.data.message);
      //   }else{
      //     Message.error(res.data.message);
      //   }
      // }, err => {
      //   setLoading(false);
      // })

      modalCancel();
    }

    const visibleChange = (value) => {
      if(value) {   // 打开模态框执行
        AppliForm.id = props.detailInfo.id ? props.detailInfo.id : "";
        AppliForm.proName = props.detailInfo.proName ? props.detailInfo.proName : "";
        AppliForm.desc = props.detailInfo.desc ? props.detailInfo.desc : "";
        AppliForm.sell = props.detailInfo.sell ? props.detailInfo.sell : "";
        AppliForm.type = props.detailInfo.type ? props.detailInfo.type : "";
        AppliForm.field = props.detailInfo.field ? props.detailInfo.field : "";
        AppliForm.img_type = props.detailInfo.img_type ? props.detailInfo.img_type : "";
        AppliForm.text_lang = props.detailInfo.text_lang ? props.detailInfo.text_lang : "";
        AppliForm.text_length = props.detailInfo.text_length ? props.detailInfo.text_length : 0;
        AppliForm.structure_count = props.detailInfo.structure_count ? props.detailInfo.structure_count : 0;
        AppliForm.audio_quality = props.detailInfo.audio_quality ? props.detailInfo.audio_quality : "";
        AppliForm.video_quality = props.detailInfo.video_quality ? props.detailInfo.video_quality : "";
        AppliForm.price = props.detailInfo.price ? props.detailInfo.price : 0;
        AppliForm.status = props.detailInfo.status ? props.detailInfo.status : "是";
        // AppliForm.createUserId = props.detailInfo.createUserId ? props.detailInfo.createUserId : userInfo.userId;
        // AppliForm.createuserName = props.detailInfo.createuserName ? props.detailInfo.createuserName : userInfo.userName;
      }
    }

    return{
      formRef,
      ruleValidate,
      AppliForm,
      modalCancel,
      modalOK,
      loading,
      visibleChange,
      modalVisible,
    }
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
