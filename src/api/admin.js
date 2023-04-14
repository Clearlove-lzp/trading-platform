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

// 删除订单
export function deleteOrder(params) {
  return axios
    .get(agencyStr + `/api/admin/business/admin/deleteorder` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

// 根据订单编号查询订单
export function getByOrderId(params) {
  return axios
    .get(agencyStr + `/api/admin/business/admin/getByOrderId` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

// 根据卖家编号查询订单
export function getBySellerId(params) {
  return axios
    .get(agencyStr + `/api/admin/business/admin/getBySellerId` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

// 根据买家编号查询订单
export function getByUserId(params) {
  return axios
    .get(agencyStr + `/api/admin/business/admin/getByUserId` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

// 根据商品编号查询订单
export function getByDataId(params) {
  return axios
    .get(agencyStr + `/api/admin/business/admin/getByDataId` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

// 查询全部交易订单
export function getAllBusiness(params) {
  return axios
    .get(agencyStr + `/api/admin/business/admin/getAllBusiness` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

// 更新订单
export function updateBusiness(params) {
  return axios
    .post(agencyStr + `/api/admin/business/admin/updatebusiness`, params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}
