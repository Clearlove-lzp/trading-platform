<template>
  <div class="login">
    <div class="main">
      <div class="title">
        <div class="title-wrap">
          <!-- <img src="@/assets/header/znlogo.jpg" alt="" class="logo"> -->
          <span class="company">数据交易平台后台（注册）</span>
        </div>
      </div>
      <div class="form">
        <Form ref="formRef" :model="AppliForm" :label-width="80" :rules="loginRules">
        <FormItem prop="username" label="用户名">
          <Input v-model="AppliForm.username" type="text" auto-complete="off" @keyup.enter.native="registerFunc">
            <template #prefix>
                <Icon type="ios-person-outline" />
            </template>
          </Input>
        </FormItem>
          <FormItem prop="shopname" label="店铺名">
            <Input v-model="AppliForm.shopname" type="text" auto-complete="off" @keyup.enter.native="registerFunc">
              <template #prefix>
                <Icon type="ios-home-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="password" label="密码">
            <Input v-model="AppliForm.password" type="password" password auto-complete="off" @keyup.enter.native="registerFunc">
              <template #prefix>
                <Icon type="ios-lock-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="repassword" label="确认密码">
            <Input v-model="AppliForm.repassword" type="password" password auto-complete="off"  @keyup.enter.native="registerFunc">
              <template #prefix>
                <Icon type="ios-lock-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="phone" label="手机号">
            <Input v-model="AppliForm.phone" type="tel" auto-complete="off" placeholder="手机号" @keyup.enter.native="registerFunc">
              <template #prefix>
                <Icon type="ios-call-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="idcard" label="身份证号">
            <Input v-model="AppliForm.idcard" auto-complete="off" placeholder="身份证号" @keyup.enter.native="registerFunc">
              <template #prefix>
                <Icon type="ios-card-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="email" label="邮箱">
            <Input v-model="AppliForm.email" type="email" auto-complete="off" placeholder="邮箱" @keyup.enter.native="registerFunc">
              <template #prefix>
                <Icon type="ios-mail-outline" />
              </template>
            </Input>
          </FormItem>
          <Row :gutter="20">
            <Col span="12">
              <Button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="registerFunc">
                <span v-if="!loading">注 册</span>
                <span v-else>注 册 中...</span>
              </Button>
            </Col>
            <Col span="12">
              <Button size="medium" type="warning" style="width:100%;" @click.native.prevent="loginUp">
                去登录
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { loginUser } from '@/api/index';
import { useForm, useState, useRouter} from "@/hook/index.js";
import { Message } from "view-ui-plus";

let validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== this.loginForm.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
let phonePass = (rule, value, callback) => {
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!reg.test(value)) {
    callback(new Error('手机号格式不正确'))
  } else {
    callback()
  }
}
let idcardPass = (rule, value, callback) => {
  let IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  let IDre15 =  /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
  if (value === '') {
    callback(new Error('请输入身份证号'))
  } else if (!IDRe18.test(value) && !IDre15.test(value)) {
    callback(new Error('身份证号格式不正确'))
  } else {
    callback()
  }
}
let emailPass = (rule, value, callback) => {
  let emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  if (value === '') {
    callback()
  } else if (!emailReg.test(value)) {
    callback(new Error('邮箱格式不正确'))
  } else {
    callback()
  }
}

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
  shopname: [{ required: true, trigger: 'blur', message: '店铺名不能为空' }],
  password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
  repassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
  phone: [{ required: true, validator: phonePass, trigger: 'blur' }],
  idcard: [{ required: true, validator: idcardPass, trigger: 'blur' }],
  email: [{ validator: emailPass, trigger: 'blur' }]
}

// 表单
const form = {
  username: "",
  shopname: "",
  password: "",
  repassword: "",
  phone: "",
  idcard: "",
  email: "",
}
const [ formRef, AppliForm, resetForm, validateForm ] = useForm(form);

const [loading, setLoading] = useState(false);

const { router } = useRouter()

// 验证码
const [codeUrl, setCodeUrl] = useState("");
const getCode = () => {
  
}

const registerFunc = async() => {
  let boolean = await validateForm()
  if(!boolean) {
    return Message.error("请填写完整注册信息");
  }
  let params = {
    username: AppliForm.username,
    shopname: AppliForm.shopname,
    password: AppliForm.password,
    repassword: AppliForm.repassword,
    phone: AppliForm.phone,
    idcard: AppliForm.idcard,
    email: AppliForm.email,
  }
  // setLoading(true);
  // loginUser(params).then(res => {
  //   setLoading(false);
  //   if(res.data.code === 200) {
  //     Message.success("登录成功")
  //     window.sessionStorage.setItem("TOKEN", "znwy")
  //     router.push({
  //       path: '/admin/newsManagement'
  //     })
  //   }else {
  //     Message.error(res.data.msg)
  //   }
  // }, err => {
  //   setLoading(false);
  // })
  router.push({
    path: '/admin/login'
  })
}

const loginUp = () => {
  router.push({
    path: '/admin/login'
  })
}
</script>

<style lang='stylus' scoped>
@import "view-ui-plus/dist/styles/viewuiplus.css";

.login
  position relative
  width 100vw
  height 100vh
  color #000
  background linear-gradient(rgba(51, 51, 51, 1) 50%, rgba(239, 239, 239, 1) 50%)
  .main
    position absolute
    width 562px
    height 518px
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
      height 512px
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
