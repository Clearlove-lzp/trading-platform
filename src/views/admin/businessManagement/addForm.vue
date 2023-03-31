<template>
  <Modal
    v-model="modalVisible"
    :title="AppliForm.id ? '编辑' : '新增'"
    width="900px"
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
        <Row :gutter="10">
          <Col span="12">
            <FormItem label="订单编号" prop="orderId">
              <Input class="cdp-input" v-model="AppliForm.orderId"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="买方" prop="buyer">
              <Input class="cdp-input" v-model="AppliForm.buyer"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="12">
            <FormItem label="卖方" prop="seller">
              <Input class="cdp-input" v-model="AppliForm.seller"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="交易内容" prop="content1">
              <Input class="cdp-input" v-model="AppliForm.content1"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="12">
            <FormItem label="交易金额" prop="amount">
              <Input class="cdp-input" v-model="AppliForm.amount"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="状态" prop="status">
              <Select v-model="AppliForm.status">
                <Option :value="1">创建</Option>
                <Option :value="2">审核中</Option>
                <Option :value="3">驳回</Option>
                <Option :value="4">已完成</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="12">
            <FormItem label="上传订单截图" prop="phone">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">Upload files</Button>
              </Upload>
            </FormItem>
          </Col>
        </Row>
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
import { useForm, useState, useUserInfo } from "@/hook/index";
import { Message } from "view-ui-plus";
import { toRef, computed } from "vue";
// import { cutoverLevelLimitAdd, cutoverLevelLimitEdit } from '@/api/index';
import moment from "moment";

const ruleValidate = {
  buyer: [{ required: true, message: "买方不能为空" }],
  orderId: [{ required: true, message: "订单编号不能为空" }],
  status: [{ required: true, message: "状态不能为空" }],
  seller: [{ required: true, message: "卖方不能为空" }],
  content1: [{ required: true, message: "交易内容不能为空" }],
  amount: [{ required: true, message: "交易金额不能为空" }],
};

export default {
  props: {
    detailInfo: {
      type: Object,
      default: () => {},
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  setup(props, { emit }) {
    const modalVisible = toRef(props, "visible");
    const { userInfo } = useUserInfo();

    // 表单
    const form = {
      id: "",
      buyer: "",
      orderId: "",
      seller: "",
      content1: "",
      amount: "",
      status: "",
      createUserId: "",
      createbuyer: "",
    };
    const [formRef, AppliForm, resetForm, validateForm] = useForm(form);

    const modalCancel = () => {
      // 点击取消
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
        buyer: AppliForm.buyer,
        orderId: AppliForm.orderId,
        seller: AppliForm.seller,
        content1: AppliForm.content1,
        amount: AppliForm.amount,
        status: AppliForm.status,
        id: AppliForm.id,
        createUserId: AppliForm.createUserId,
        createbuyer: AppliForm.createbuyer,
      };
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
    };

    const visibleChange = (value) => {
      if (value) {
        // 打开模态框执行
        AppliForm.id = props.detailInfo.id ? props.detailInfo.id : "";
        AppliForm.buyer = props.detailInfo.buyer ? props.detailInfo.buyer : "";
        AppliForm.orderId = props.detailInfo.orderId
          ? props.detailInfo.orderId
          : "";
        AppliForm.seller = props.detailInfo.seller
          ? props.detailInfo.seller
          : "";
        AppliForm.content1 = props.detailInfo.content1
          ? props.detailInfo.content1
          : "";
        AppliForm.amount = props.detailInfo.amount
          ? props.detailInfo.amount
          : "";

        AppliForm.status = props.detailInfo.status
          ? props.detailInfo.status
          : "";
        // AppliForm.createUserId = props.detailInfo.createUserId ? props.detailInfo.createUserId : userInfo.userId;
        // AppliForm.createbuyer = props.detailInfo.createbuyer ? props.detailInfo.createbuyer : userInfo.buyer;
      }
    };

    return {
      formRef,
      ruleValidate,
      AppliForm,
      modalCancel,
      modalOK,
      loading,
      visibleChange,
      modalVisible,
    };
  },
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

.cdp-input {
  width: 100%;
}
</style>
