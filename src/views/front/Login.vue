<template>
  <div class="login" :style="'background-image:url(' + Background + ');'">
    <Form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h3 class="title">XXX数据交易平台</h3>
      <FormItem prop="username">
        <Input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix>
            <Icon type="ios-person-outline" />
          </template>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input
          v-model="loginForm.password"
          type="password"
          password
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <Icon type="ios-lock-outline" />
          </template>
        </Input>
      </FormItem>
      <FormItem prop="code">
        <Input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <Icon type="ios-unlock-outline" />
          </template>
        </Input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" />
        </div>
      </FormItem>
      <Checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0">
        记住我
      </Checkbox>
      <div class="button-container">
        <Button
          :loading="loading"
          type="primary"
          style="width: 30%; margin-right: 20px"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </Button>
        <Button
          type="warning"
          style="width: 30%"
          @click.prevent="handleRegister"
          >去注册</Button
        >
      </div>
    </Form>
  </div>
</template>

<script>
import { encrypt } from "@/libs/util.js";
// import { getCodeImg } from '@/api/login'
import Cookies from "js-cookie";
import qs from "qs";
import Background from "@/assets/imgs/background.jpg";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      Background: Background,
      codeUrl: "",
      cookiePass: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        code: [{ required: true, trigger: "blur", message: "验证码不能为空" }],
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const data = route.query;
        if (data && data.redirect) {
          this.redirect = data.redirect;
          delete data.redirect;
          if (JSON.stringify(data) !== "{}") {
            this.redirect =
              this.redirect + "&" + qs.stringify(data, { indices: false });
          }
        }
      },
      immediate: true,
    },
  },
  created() {
    // 获取验证码
    // this.getCode()
    // 获取用户名密码等Cookie
    this.getCookie();
    // token 过期提示
    this.point();
  },
  methods: {
    ...mapMutations("user", ["setUserInfo"]),
    getCode() {
      getCodeImg().then((res) => {
        this.codeUrl = res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      let password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? "" : password;
      password = password === undefined ? this.loginForm.password : password;
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: "",
      };
    },
    handleLogin() {
      this.$refs.loginFormRef.validate((valid) => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid,
        };
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password);
        }
        if (valid) {
          this.loading = true;
          if (user.rememberMe) {
            Cookies.set("username", user.username, { expires: 1 });
            Cookies.set("password", user.password, { expires: 1 });
            Cookies.set("rememberMe", user.rememberMe, { expires: 1 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.setUserInfo(user);
          this.$router.push({ path: "/index" });
          // this.$store.dispatch('Login', user).then(() => {
          //   this.loading = false
          //   this.$router.push({ path: '/dashboard' })
          // }).catch(() => {
          //   this.loading = false
          //   this.getCode()
          // })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRegister() {
      this.$router.push({
        path: "/register",
      });
    },
    point() {
      const point = Cookies.get("point") !== undefined;
      if (point) {
        this.$notify({
          title: "提示",
          message: "当前登录状态已过期，请重新登录！",
          type: "warning",
          duration: 5000,
        });
        Cookies.remove("point");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: block;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.button-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>
