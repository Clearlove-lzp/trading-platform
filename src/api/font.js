import axios from "axios";
import { agencyStr } from "@/axiosConfig/enviromentConfig.js";

export function getRec(params) {
  return axios
    .get(agencyStr + `/api/user/index/rec` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

export function getDataDetail(params) {
  return axios
    .get(agencyStr + `/api/user/index/detail` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

export function addToCart(params) {
  return axios
    .post(agencyStr + `/api/data/cart/add` , params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

export function getCart(params) {
  return axios
    .get(agencyStr + `/api/data/cart/get` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}
