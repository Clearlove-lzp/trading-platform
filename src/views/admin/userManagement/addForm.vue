<template>
  <Modal v-model="modalVisible" :title="AppliForm.id ? '编辑' : '新增'" width="550px"
    class-name="vertical-center-modal" :mask-closable="false" @on-cancel="modalCancel"
    @on-visible-change="visibleChange">
    <div class="content">
      <Form ref="formRef" class="cdp-form" :rules="ruleValidate" :model="AppliForm" :label-width="120">
        <FormItem label="用户名" prop="userName">
          <Input class="cdp-input" v-model="AppliForm.userName"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input class="cdp-input" v-model="AppliForm.password" type="password"></Input>
        </FormItem>
        <FormItem label="昵称" prop="neakName">
          <Input class="cdp-input" v-model="AppliForm.neakName"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input class="cdp-input" v-model="AppliForm.phone"></Input>
        </FormItem>
        <FormItem label="所属角色" prop="jobName">
          <Select class="cdp-input" v-model="AppliForm.jobName">
            <Option value="系统管理员">系统管理员</Option>
            <Option value="客户">客户</Option>
            <Option value="卖家">卖家</Option>
          </Select>
        </FormItem>
        <FormItem label="状态" prop="status">
          <i-switch v-model="AppliForm.status" true-value="是" false-value="否" true-color="#13ce66" false-color="#ff4949">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
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
  userName: [
    { required: true, message: '用户名不能为空'}
  ],
  password: [
    { required: true, message: '密码不能为空'}
  ],
  neakName: [
    { required: true, message: '昵称不能为空'}
  ],
  phone: [
    { required: true, message: '手机号不能为空'}
  ],
  jobName: [
    { required: true, message: '所属角色不能为空'}
  ],
  status: [
    { required: true, message: '状态不能为空'}
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
      userName: "",
      password: "",
      neakName: "",
      phone: "",
      jobName: "",
      status: "是",
      createUserId: "",
      createUserName: ""
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
        userName: AppliForm.userName,
        password: AppliForm.password,
        neakName: AppliForm.neakName,
        jobName: AppliForm.jobName,
        phone: AppliForm.phone,
        status: AppliForm.status,
        id: AppliForm.id,
        createUserId: AppliForm.createUserId,
        createUserName: AppliForm.createUserName
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
        AppliForm.userName = props.detailInfo.userName ? props.detailInfo.userName : "";
        AppliForm.password = props.detailInfo.password ? props.detailInfo.password : "";
        AppliForm.neakName = props.detailInfo.neakName ? props.detailInfo.neakName : "";
        AppliForm.phone = props.detailInfo.phone ? props.detailInfo.phone : "";
        AppliForm.jobName = props.detailInfo.jobName ? props.detailInfo.jobName : "";
        AppliForm.status = props.detailInfo.status ? props.detailInfo.status : "是";
        // AppliForm.createUserId = props.detailInfo.createUserId ? props.detailInfo.createUserId : userInfo.userId;
        // AppliForm.createUserName = props.detailInfo.createUserName ? props.detailInfo.createUserName : userInfo.userName;
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