<template>
  <Modal
    v-model="modalVisible"
    title="编辑"
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
        <FormItem prop="username" label="账号">
          <Input
            v-model="AppliForm.username"
            disabled
            type="text"
            placeholder="账号"
            auto-complete="off"
            @keyup.enter="registerFunc"
          >
            <template #prefix>
              <Icon type="ios-person-outline" />
            </template>
          </Input>
        </FormItem>
        <FormItem prop="name" label="昵称" v-if="AppliForm.role === 'user'">
          <Input
            v-model="AppliForm.name"
            type="text"
            placeholder="昵称"
            auto-complete="off"
            @keyup.enter="registerFunc"
          >
            <template #prefix>
              <Icon type="ios-person-outline" />
            </template>
          </Input>
        </FormItem>
        <FormItem prop="name" label="店铺名" v-else>
          <Input
            v-model="AppliForm.name"
            type="text"
            placeholder="店铺名"
            auto-complete="off"
            @keyup.enter="registerFunc"
          >
            <template #prefix>
              <Icon type="ios-person-outline" />
            </template>
          </Input>
        </FormItem>
        <FormItem prop="phone" label="手机号">
          <Input
            v-model="AppliForm.phone"
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
        <!-- <FormItem prop="id_card" label="身份证号">
          <Input
            v-model="AppliForm.id_card"
            auto-complete="off"
            placeholder="身份证号"
            @keyup.enter="registerFunc"
          >
            <template #prefix>
              <Icon type="ios-card-outline" />
            </template>
          </Input>
        </FormItem> -->
        <FormItem prop="email" label="邮箱">
          <Input
            v-model="AppliForm.email"
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
import { upadteUser, updateSeller } from "@/api/index";
import moment from "moment";

let phonePass = (rule, value, callback) => {
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
let id_cardPass = (rule, value, callback) => {
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
  username: [{ required: true, trigger: "blur", message: "账号不能为空" }],
  name: [{ required: true, trigger: "blur", message: "不能为空" }],
  phone: [{ required: true, validator: phonePass, trigger: "blur" }],
  id_card: [{ required: true, validator: id_cardPass, trigger: "blur" }],
  email: [{ validator: emailPass, trigger: "blur" }],
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
      user_id: "",
      username: "",
      name: "",
      phone: "",
      id_card: "",
      email: "",
      role: "",
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
      let params = {};
      if (AppliForm.role === "user") {
        params.user_id = AppliForm.user_id;
        params.username = AppliForm.username;
        params.name = AppliForm.name;
        params.phone = AppliForm.phone;
        params.id_card = AppliForm.id_card;
        params.email = AppliForm.email;
      } else {
        params.seller_id = AppliForm.user_id;
        params.seller_account = AppliForm.username;
        params.seller_name = AppliForm.name;
        params.seller_tel = AppliForm.phone;
        params.seller_idcard = AppliForm.id_card;
        params.seller_email = AppliForm.email;
      }
      setLoading(true);
      let func = AppliForm.role === "user" ? upadteUser : updateSeller;
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
      let result = props.detailInfo;
      if (result.role === "user") {
        AppliForm.user_id = result.user_id ? result.user_id : "";
        AppliForm.username = result.username ? result.username : "";
        AppliForm.name = result.name ? result.name : "";
        AppliForm.phone = result.phone ? result.phone : "";
        AppliForm.id_card = result.id_card ? result.id_card : "";
        AppliForm.email = result.email ? result.email : "";
        AppliForm.role = result.role ? result.role : "";
      } else {
        AppliForm.user_id = result.seller_id ? result.seller_id : "";
        AppliForm.username = result.seller_account ? result.seller_account : "";
        AppliForm.name = result.seller_name ? result.seller_name : "";
        AppliForm.phone = result.seller_tel ? result.seller_tel : "";
        AppliForm.id_card = result.seller_idcard ? result.seller_idcard : "";
        AppliForm.email = result.seller_email ? result.seller_email : "";
        AppliForm.role = result.role ? result.role : "";
      }
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