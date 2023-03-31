import axios from "axios";
import { agencyStr } from "@/axiosConfig/enviromentConfig.js";

// 订单查询
export function businessGet(params) {
  return axios.get(agencyStr + `/api/admin/business/get` + params).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 订单删除
export function businessDelete(params) {
  return axios.post(agencyStr + `/api/admin/business/delete`, params).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}
