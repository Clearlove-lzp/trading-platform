import axios from "axios";
import { agencyStr } from "@/axiosConfig/enviromentConfig.js";

// 获取用户登录信息
export function loginUser(data) {
  return axios.post(agencyStr + `/api/user/login`, data).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 卖家登录
export function loginSeller(data) {
  return axios.post(agencyStr + `/api/seller/login`, data).then(
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
  return axios.post(agencyStr + `/api/admin/login`, data).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 获取验证码
export const loginCode = agencyStr + `/code/getCode/`;

// 获取卖家和平台信息
export function loginGetUser() {
  return axios.get(agencyStr + `/api/data/getUser`).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 卖家注册
export function sellerRegister(data) {
  return axios.post(agencyStr + `/api/seller/register`, data).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 买家注册
export function userRegister(data) {
  return axios.post(agencyStr + `/api/user/register`, data).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}
