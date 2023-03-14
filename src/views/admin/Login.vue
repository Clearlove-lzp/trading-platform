<template>
  <div class="login">
    <div class="main">
      <div class="title">
        <div class="title-wrap">
          <!-- <img src="@/assets/header/znlogo.jpg" alt="" class="logo"> -->
          <span class="company">数据交易平台后台</span>
        </div>
      </div>
      <div class="form">
        <div class="user">
          <span>用户名：</span>
          <Input class="i-user i-login" v-model='AppliForm.user'></Input>
        </div>
        <div class="pwd">
          <span>密码：</span>
          <Input class="i-pwd i-login" v-model='AppliForm.pwd' type='password'></Input>
        </div>
        <Button class="btn" @click='loginUp' :loading="loading">登录</Button>
        <!-- <span class="forget-pwd">忘记密码？</span> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { loginUser } from '@/api/index';
import { useForm, useState, useRouter} from "@/hook/index.js";
import { Message } from "view-ui-plus";

// 表单
const form = {
  user: "",
  pwd: ""
}
const [ formRef, AppliForm, resetForm, validateForm ] = useForm(form);

const [loading, setLoading] = useState(false);

const { router } = useRouter()

const loginUp = () => {
  let params = {
    user: AppliForm.user,
    pwd: AppliForm.pwd
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
    path: '/admin/dashboard'
  })
}
</script>

<style lang='stylus'>
.login
  position relative
  width 100vw
  height 100vh
  color #000
  background linear-gradient(rgba(51, 51, 51, 1) 50%, rgba(239, 239, 239, 1) 50%)
  .main
    position absolute
    width 562px
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
