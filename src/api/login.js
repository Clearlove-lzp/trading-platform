import axios from "axios";
import { api, code } from "@/axiosConfig/enviromentConfig.js";

// 用户登录
export function loginUser(data) {
  return axios.post(api + `/user/login`, data).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 平台登录
export function loginPlatForm(data) {
  return axios.post(api + `/admin/login`, data).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 获取验证码
export function loginCode(data) {
  return axios.get(code + `/getCode/` + data).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}
