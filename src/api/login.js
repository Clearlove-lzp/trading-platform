import axios from "axios";
import { api } from "@/axiosConfig/enviromentConfig.js";

let url = api;

// 后台登录
export function loginUser(data) {
  return axios.post(url + `/znwy/login`, data).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}
