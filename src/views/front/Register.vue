<template>
  <div class="login" :style="'background-image:url('+ Background +');'">
    <Form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">
        注册
      </h3>
      <FormItem prop="username">
        <Input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="Input__icon input-icon" />
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="Input__icon input-icon" />
        </Input>
      </FormItem >
      <FormItem prop="repassword">
        <Input v-model="loginForm.repassword" type="password" auto-complete="off" placeholder="确认密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="Input__icon input-icon" />
        </Input>
      </FormItem >
      <FormItem style="width:100%;">
        <Button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </Button>
      </FormItem >
      <FormItem style="width:100%;">
        <Button size="medium" type="warning" style="width:100%;" @click.native.prevent="handleLogin">去登录</Button>
      </FormItem >
    </Form>
  </div>
</template>

<script>
import { encrypt } from '@/libs/util.js'
import Cookies from 'js-cookie'
import Background from '@/assets/imgs/background.jpg';
import { Message } from "view-ui-plus";
export default {
  name: 'Register',
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      Background: Background,
      codeUrl: '',
      cookiePass: '',
      loginForm: {
        username: '',
        password: '',
        repassword: '',
        uuid: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        repassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    handleLogin() {
      this.$router.push({
        path: '/login'
      })
    },
    handleRegister() {
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid
        }
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password)
        }
        if (valid) {
          this.loading = true
          if (user.rememberMe) {
            Cookies.set('username', user.username, { expires: 1 })
            Cookies.set('password', user.password, { expires: 1 })
            Cookies.set('rememberMe', user.rememberMe, { expires: 1 })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$router.push({ path: '/login' });
          Message.success("注册成功，前往登录");
          // this.$store.dispatch('Login', user).then(() => {
          //   this.loading = false
          //   this.$router.push({ path: '/dashboard' })
          // }).catch(() => {
          //   this.loading = false
          //   this.getCode()
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '../../assets/scss/reset.scss';
@import "view-ui-plus/dist/styles/viewuiplus.css";
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-size: cover;
  }
  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 385px;
    padding: 25px 25px 5px 25px;
    .Input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;width: 14px;margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
</style>
