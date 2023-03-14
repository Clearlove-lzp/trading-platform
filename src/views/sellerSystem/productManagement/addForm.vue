<template>
  <Modal v-model="modalVisible" :title="AppliForm.id ? '编辑' : '新增'" width="550px"
    class-name="vertical-center-modal" :mask-closable="false" @on-cancel="modalCancel"
    @on-visible-change="visibleChange">
    <div class="content">
      <Form ref="formRef" class="cdp-form" :rules="ruleValidate" :model="AppliForm" :label-width="120">
        <FormItem label="商品名称" prop="proName">
          <Input class="cdp-input" v-model="AppliForm.proName"></Input>
        </FormItem>
        <FormItem label="商品描述" prop="desc">
          <Input class="cdp-input" v-model="AppliForm.desc" type="textarea" :autosize="{minRows: 3}"></Input>
        </FormItem>
        <FormItem label="商品库存" prop="proNum">
          <InputNumber class="cdp-input" v-model="AppliForm.proNum" :min="0" controls-outside></InputNumber>
        </FormItem>
        <FormItem label="商品价格" prop="price">
          <InputNumber class="cdp-input" v-model="AppliForm.price" :min="0" controls-outside></InputNumber>
        </FormItem>
        <FormItem label="商品原价" prop="oldPrice">
          <InputNumber class="cdp-input" v-model="AppliForm.oldPrice" :min="0" controls-outside></InputNumber>
        </FormItem>
        <FormItem label="商品尺码" prop="proSize">
          <Input class="cdp-input" v-model="AppliForm.proSize"></Input>
        </FormItem>
        <FormItem label="商品尺码" prop="proSize">
          <Input class="cdp-input" v-model="AppliForm.proSize"></Input>
        </FormItem>
        <FormItem label="是否上架" prop="status">
          <i-switch v-model="AppliForm.status" true-value="是" false-value="否" true-color="#13ce66" false-color="#ff4949">
            <span slot="open">上架</span>
            <span slot="close">下架</span>
          </i-switch>
        </FormItem>
        <FormItem label="商品图片" prop="pic">
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
    { required: true, message: '商品名称不能为空'}
  ],
  desc: [
    { required: true, message: '商品描述不能为空'}
  ],
  proNum: [
    { required: true, type: 'number', message: '商品数量不能为空'}
  ],
  price: [
    { required: true, type: 'number', message: '商品价格不能为空'}
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
      proNum: 0,
      price: 0,
      oldPrice: 0,
      proSize: "",
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
        proNum: AppliForm.proNum,
        price: AppliForm.price,
        oldPrice: AppliForm.oldPrice,
        proSize: AppliForm.proSize,
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
        AppliForm.proNum = props.detailInfo.proNum ? props.detailInfo.proNum : 0;
        AppliForm.price = props.detailInfo.price ? props.detailInfo.price : 0;
        AppliForm.oldPrice = props.detailInfo.oldPrice ? props.detailInfo.oldPrice : 0;
        AppliForm.proSize = props.detailInfo.proSize ? props.detailInfo.proSize : "";
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
/deep/.vertical-center-modal{
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
