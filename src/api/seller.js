import axios from "axios";
import { agencyStr } from "@/axiosConfig/enviromentConfig.js";

// 商品新增
export function datasetUpdate(params) {
  return axios.post(agencyStr + `/api/data/dataset/update`, params).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 商品查询
export function datasetGet(params) {
  return axios.get(agencyStr + `/api/data/dataset/get` + params).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 商品查询
export function datasetDelete(params) {
  return axios.post(agencyStr + `/api/data/dataset/delete`, params).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}
