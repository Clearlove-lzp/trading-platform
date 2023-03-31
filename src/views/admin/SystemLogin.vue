<template>
  <div class="login">
    <div class="main">
      <div class="title">
        <div class="title-wrap">
          <!-- <img src="@/assets/header/znlogo.jpg" alt="" class="logo"> -->
          <span class="company">数据交易平台后台（登录）</span>
        </div>
      </div>
      <div class="form">
        <Form :model="AppliForm" :rules="loginRules" ref="formRef">
          <FormItem prop="admin_name">
            <Input
              v-model="AppliForm.admin_name"
              type="text"
              auto-complete="off"
              placeholder="账号"
              @keyup.enter="loginUp"
            >
              <template #prefix>
                <Icon type="ios-person-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="admin_psd">
            <Input
              v-model="AppliForm.admin_psd"
              type="password"
              password
              auto-complete="off"
              placeholder="密码"
              @keyup.enter="loginUp"
            >
              <template #prefix>
                <Icon type="ios-lock-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="code">
            <Row :gutter="20">
              <Col span="12">
                <Input
                  v-model="AppliForm.code"
                  auto-complete="off"
                  placeholder="验证码"
                  @keyup.enter="loginUp"
                >
                  <template #prefix>
                    <Icon type="ios-unlock-outline" />
                  </template>
                </Input>
              </Col>
              <Col span="12">
                <div class="login-code">
                  <img :src="codeUrl" @click="getCode" />
                </div>
              </Col>
            </Row>
          </FormItem>
          <Row :gutter="20">
            <Col span="24">
              <Button
                :loading="loading"
                type="primary"
                style="width: 100%"
                @click.prevent="loginUp"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { loginPlatForm, loginCode } from "@/api/index";
import { useForm, useState, useRouter, useEffect } from "@/hook/index.js";
import { Message } from "view-ui-plus";
import md5 from "js-md5";

const loginRules = {
  admin_name: [{ required: true, trigger: "blur", message: "用户名不能为空" }],
  admin_psd: [{ required: true, trigger: "blur", message: "密码不能为空" }],
  code: [{ required: true, trigger: "blur", message: "验证码不能为空" }],
};

// 表单
const form = {
  admin_name: "",
  admin_psd: "",
  code: "",
};
const [formRef, AppliForm, resetForm, validateForm] = useForm(form);

const [loading, setLoading] = useState(false);

const { router } = useRouter();

// 验证码
const [codeUrl, setCodeUrl] = useState("");
const getCode = () => {
  let params = parseInt(Math.random() * 89999) + 10000;
  setCodeUrl(loginCode + params);
};
useEffect(getCode, []);

const loginUp = async () => {
  let boolean = await validateForm();
  if (!boolean) {
    return Message.error("请填写完整登录信息");
  }
  let params = {
    admin_name: AppliForm.admin_name,
    // admin_psd: AppliForm.admin_psd,
    admin_psd: md5(AppliForm.admin_psd),
    code: AppliForm.code,
  };
  setLoading(true);
  loginPlatForm(params).then(
    (res) => {
      setLoading(false);
      if (res.data.code === 1) {
        Message.success("登录成功");
        window.localStorage.setItem("role", "admin");
        router.push({
          path: "/admin/dashboard",
        });
      } else {
        Message.error(res.data.msg);
        getCode();
      }
    },
    (err) => {
      setLoading(false);
    }
  );
};
</script>

<style lang='stylus' scoped>
@import 'view-ui-plus/dist/styles/viewuiplus.css'
.login
  position relative
  width 100vw
  height 100vh
  color #000
  background linear-gradient(rgba(51, 51, 51, 1) 50%, rgba(239, 239, 239, 1) 50%)
  .main
    position absolute
    width 540px
    height 374px
    margin auto
    top 0
    bottom 0
    left 0
    right 0
    .title
      width 100%
      height 58px
      .title-wrap
        width 63%
        margin 0 auto
        text-align center
        .logo
          padding 10px 20px
          width 78px
          height 58px
          box-sizing border-box
          background-size contain
        .company
          height 58px
          line-height 58px
          font-family '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑'
          font-weight 700
          font-style normal
          font-size 28px
          color #FFFFFF
          vertical-align top
    .form
      position relative
      height 316px
      background #FFF
      padding 50px 75px
      .user, .pwd
        margin auto
        &:after
          content ''
          display table
          clear both
        span
          display inline-block
          float left
          line-height 39px
          font-family '微软雅黑'
          font-weight 400
          font-style normal
          font-size 16px
          color #666666
        .i-login
          width 317px
          height 39px
          float right
          line-height 39px
      .pwd
        margin-top 25px
      .btn
        width 197px
        height 48px
        margin-top 45px
        margin-left 155px
        background-color rgba(51, 51, 51, 1)
        color #FFF
        font-family '微软雅黑'
        font-weight 400
        font-style normal
        font-size 16px
      .forget-pwd
        position absolute
        bottom 35px
        right 45px
</style>
