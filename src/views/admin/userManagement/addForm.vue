<template>
  <Modal
    v-model="modalVisible"
    :title="AppliForm.id ? '编辑' : '新增'"
    width="550px"
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
        <FormItem prop="seller_account" label="账号">
          <Input
            v-model="AppliForm.seller_account"
            type="text"
            auto-complete="off"
            @keyup.enter="registerFunc"
          >
            <template #prefix>
              <Icon type="ios-person-outline" />
            </template>
          </Input>
        </FormItem>
        <FormItem prop="seller_name" label="用户名/店铺名">
          <Input
            v-model="AppliForm.seller_name"
            type="text"
            auto-complete="off"
            @keyup.enter="registerFunc"
          >
            <template #prefix>
              <Icon type="ios-person-outline" />
            </template>
          </Input>
        </FormItem>
        <FormItem prop="seller_tel" label="手机号">
          <Input
            v-model="AppliForm.seller_tel"
            type="tel"
            auto-complete="off"
            placeholder="手机号"
            @keyup.enter="registerFunc"
          >
            <template #prefix>
              <Icon type="ios-call-outline" />
            </template>
          </Input>
        </FormItem>
        <FormItem prop="seller_idcard" label="身份证号">
          <Input
            v-model="AppliForm.seller_idcard"
            auto-complete="off"
            placeholder="身份证号"
            @keyup.enter="registerFunc"
          >
            <template #prefix>
              <Icon type="ios-card-outline" />
            </template>
          </Input>
        </FormItem>
        <FormItem prop="seller_email" label="邮箱">
          <Input
            v-model="AppliForm.seller_email"
            type="email"
            auto-complete="off"
            placeholder="邮箱"
            @keyup.enter="registerFunc"
          >
            <template #prefix>
              <Icon type="ios-mail-outline" />
            </template>
          </Input>
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
import { useForm, useState, useUserInfo } from "@/hook/index";
import { Message } from "view-ui-plus";
import { toRef, computed } from "vue";
import { userInsert, upadteUser, selectByUsernameAndRole } from "@/api/index";
import moment from "moment";

let seller_telPass = (rule, value, callback) => {
  let reg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else if (!reg.test(value)) {
    callback(new Error("手机号格式不正确"));
  } else {
    callback();
  }
};
let seller_idcardPass = (rule, value, callback) => {
  let IDRe18 =
    /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  let IDre15 =
    /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
  if (value === "") {
    callback(new Error("请输入身份证号"));
  } else if (!IDRe18.test(value) && !IDre15.test(value)) {
    callback(new Error("身份证号格式不正确"));
  } else {
    callback();
  }
};
let emailPass = (rule, value, callback) => {
  let emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  if (value === "") {
    callback();
  } else if (!emailReg.test(value)) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback();
  }
};

const ruleValidate = {
  seller_account: [
    { required: true, trigger: "blur", message: "账号不能为空" },
  ],
  seller_name: [{ required: true, trigger: "blur", message: "店铺名不能为空" }],
  seller_tel: [{ required: true, validator: seller_telPass, trigger: "blur" }],
  seller_idcard: [
    { required: true, validator: seller_idcardPass, trigger: "blur" },
  ],
  seller_email: [{ validator: emailPass, trigger: "blur" }],
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
      data_id: "",
      seller_account: "",
      seller_name: "",
      seller_tel: "",
      seller_idcard: "",
      seller_email: "",
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
        data_id: AppliForm.data_id,
        seller_account: AppliForm.seller_account,
        seller_name: AppliForm.seller_name,
        seller_tel: AppliForm.seller_tel,
        seller_idcard: AppliForm.seller_idcard,
        seller_email: AppliForm.seller_email,
      };
      setLoading(true);
      let func = !AppliForm.id ? userInsert : upadteUser;
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

      modalCancel();
    };

    const queryDetail = async () => {
      let result = {};
      if (props.detailInfo.id) {
        let params = `?username=${props.detailInfo.username}&user_role=${props.detailInfo.role}`;
        let res = await selectByUsernameAndRole(params);
        if (res.data.code === 1) {
          let arr = res.data.data.filter((x) => {
            return x.role === props.detailInfo.role;
          });
          if (arr.length) result = arr[0];
        }
      }
      AppliForm.data_id = result.data_id ? result.data_id : "";
      AppliForm.seller_account = result.seller_account
        ? result.seller_account
        : "";
      AppliForm.seller_name = result.seller_name ? result.seller_name : "";
      AppliForm.seller_tel = result.seller_tel ? result.seller_tel : "";
      AppliForm.seller_idcard = result.seller_idcard
        ? result.seller_idcard
        : "";
      AppliForm.seller_email = result.seller_email ? result.seller_email : "";
    };

    const visibleChange = (value) => {
      if (value) {
        // 打开模态框执行
        queryDetail();
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