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
          <FormItem prop="seller_account" label="用户名">
            <Input v-model="AppliForm.seller_account" type="text" auto-complete="off" @keyup.enter.native="registerFunc">
              <template #prefix>
                  <Icon type="ios-person-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="seller_name" label="店铺名">
            <Input v-model="AppliForm.seller_name" type="text" auto-complete="off" @keyup.enter.native="registerFunc">
              <template #prefix>
                <Icon type="ios-person-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="seller_psd" label="密码">
            <Input v-model="AppliForm.seller_psd" type="password" password auto-complete="off" @keyup.enter.native="registerFunc">
              <template #prefix>
                <Icon type="ios-lock-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="seller_re_psd" label="确认密码">
            <Input v-model="AppliForm.seller_re_psd" type="password" password auto-complete="off"  @keyup.enter.native="registerFunc">
              <template #prefix>
                <Icon type="ios-lock-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="seller_tel" label="手机号">
            <Input v-model="AppliForm.seller_tel" type="tel" auto-complete="off" placeholder="手机号" @keyup.enter.native="registerFunc">
              <template #prefix>
                <Icon type="ios-call-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="seller_idcard" label="身份证号">
            <Input v-model="AppliForm.seller_idcard" auto-complete="off" placeholder="身份证号" @keyup.enter.native="registerFunc">
              <template #prefix>
                <Icon type="ios-card-outline" />
              </template>
            </Input>
          </FormItem>
          <FormItem prop="seller_email" label="邮箱">
            <Input v-model="AppliForm.seller_email" type="email" auto-complete="off" placeholder="邮箱" @keyup.enter.native="registerFunc">
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
import { sellerRegister } from '@/api/index';
import { useForm, useState, useRouter} from "@/hook/index.js";
import { Message } from "view-ui-plus";

let validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== AppliForm.seller_psd) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
let seller_telPass = (rule, value, callback) => {
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!reg.test(value)) {
    callback(new Error('手机号格式不正确'))
  } else {
    callback()
  }
}
let seller_idcardPass = (rule, value, callback) => {
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
  seller_account: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
  seller_name: [{ required: true, trigger: 'blur', message: '店铺名不能为空' }],
  seller_psd: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
  seller_re_psd: [{ required: true, validator: validatePass2, trigger: 'blur' }],
  seller_tel: [{ required: true, validator: seller_telPass, trigger: 'blur' }],
  seller_idcard: [{ required: true, validator: seller_idcardPass, trigger: 'blur' }],
  seller_email: [{ validator: emailPass, trigger: 'blur' }]
}

// 表单
const form = {
  seller_account: "",
  seller_name: "",
  seller_psd: "",
  seller_re_psd: "",
  seller_tel: "",
  seller_idcard: "",
  seller_email: "",
}
const [ formRef, AppliForm, resetForm, validateForm ] = useForm(form);

const [loading, setLoading] = useState(false);

const { router } = useRouter()

const registerFunc = async () => {
  let boolean = await validateForm()
  if(!boolean) {
    return Message.error("请填写完整注册信息");
  }
  let params = {
    seller_account: AppliForm.seller_account,
    seller_name: AppliForm.seller_name,
    seller_psd: AppliForm.seller_psd,
    seller_re_psd: AppliForm.seller_re_psd,
    seller_tel: AppliForm.seller_tel,
    seller_idcard: AppliForm.seller_idcard,
    seller_email: AppliForm.seller_email,
  }
  setLoading(true);
  sellerRegister(params).then(res => {
    setLoading(false);
    if(res.data.code === 1) {
      Message.success("注册成功，前往登录")
      router.push({
        path: '/admin/login'
      })
    }else {
      Message.error(res.data.msg)
    }
  }, err => {
    setLoading(false);
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
