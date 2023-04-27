<template>
  <div class="login" :style="'background-image:url(' + Background + ');'">
    <Form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      :label-width="80"
      class="login-form"
    >
      <h3 class="title">注册</h3>
      <FormItem prop="username" label="账号" :label-width="80">
        <Input v-model="loginForm.username" type="text" auto-complete="off">
          <template #prefix>
            <Icon type="ios-person-outline" />
          </template>
        </Input>
      </FormItem>
      <FormItem prop="name" label="昵称" :label-width="80">
        <Input v-model="loginForm.name" type="text" auto-complete="off">
          <template #prefix>
            <Icon type="ios-person-outline" />
          </template>
        </Input>
      </FormItem>
      <FormItem prop="password" label="密码">
        <Input
          v-model="loginForm.password"
          type="password"
          password
          auto-complete="off"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <Icon type="ios-lock-outline" />
          </template>
        </Input>
      </FormItem>
      <FormItem prop="repassword" label="确认密码">
        <Input
          v-model="loginForm.repassword"
          type="password"
          password
          auto-complete="off"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <Icon type="ios-lock-outline" />
          </template>
        </Input>
      </FormItem>
      <FormItem prop="phone" label="手机号">
        <Input
          v-model="loginForm.phone"
          type="tel"
          auto-complete="off"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <Icon type="ios-call-outline" />
          </template>
        </Input>
      </FormItem>
      <FormItem prop="id_card" label="身份证号">
        <Input
          v-model="loginForm.id_card"
          auto-complete="off"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <Icon type="ios-card-outline" />
          </template>
        </Input>
      </FormItem>
      <FormItem prop="email" label="邮箱">
        <Input
          v-model="loginForm.email"
          type="email"
          auto-complete="off"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <Icon type="ios-mail-outline" />
          </template>
        </Input>
      </FormItem>
      <div class="button-container">
        <Button
          :loading="loading"
          type="primary"
          style="width: 30%; margin-right: 20px"
          @click.prevent="handleRegister"
        >
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </Button>
        <Button type="warning" style="width: 30%" @click.prevent="handleLogin"
          >去登录</Button
        >
      </div>
    </Form>
  </div>
</template>

<script>
import { encrypt } from "@/libs/util.js";
import Background from "@/assets/imgs/background.jpg";
import { Message } from "view-ui-plus";
import { userRegister } from "@/api/index.js";
import md5 from "js-md5";
export default {
  name: "Register",
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
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

    return {
      Background: Background,
      cookiePass: "",
      loginForm: {
        username: "",
        name: "",
        password: "",
        repassword: "",
        phone: "",
        email: "",
        id_card: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "账号不能为空" },
        ],
        name: [{ required: true, trigger: "blur", message: "昵称不能为空" }],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        repassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        phone: [{ required: true, validator: phonePass, trigger: "blur" }],
        id_card: [{ required: true, validator: id_cardPass, trigger: "blur" }],
        email: [{ validator: emailPass, trigger: "blur" }],
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {},
  created() {},
  methods: {
    handleLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    handleRegister() {
      this.$refs.loginForm.validate((valid) => {
        const user = {
          username: this.loginForm.username,
          name: this.loginForm.name,
          password: md5(this.loginForm.password),
          phone: this.loginForm.phone,
          code: this.loginForm.code,
          email: this.loginForm.email,
          id_card: this.loginForm.id_card,
        };
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password);
        }
        if (valid) {
          this.loading = true;
          userRegister(user).then(
            (res) => {
              this.loading = false;
              if (res.data.code === 1) {
                Message.success("注册成功，前往登录");
                this.$router.push({
                  path: "/login",
                });
              } else {
                Message.error(res.data.msg);
              }
            },
            (err) => {
              this.loading = false;
            }
          );
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
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  width: 500px;
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

.button-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>
