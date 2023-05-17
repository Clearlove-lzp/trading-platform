import axios from "axios";
import { agencyStr } from "@/axiosConfig/enviromentConfig.js";

// 商品新增
export function datasetAdd(params) {
  return axios.post(agencyStr + `/api/data/dataset/add`, params).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 商品编辑
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

//商品状态更新
export function datasetStatusUpdate(params) {
  return axios.post(agencyStr + `/api/data/dataset/updateStatus`, params).then(
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

// 商品查询byId
export function datasetGetDetail(params) {
  return axios.get(agencyStr + `/api/data/dataset/get/detail` + params).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 商品删除
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

// 订单展示
export function orderManagementSelectById(params) {
  return axios
    .get(agencyStr + `/api/admin/orderManagement/selectById` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

// 订单检索
export function orderManagementSelectById2(params) {
  return axios
    .get(agencyStr + `/api/admin/orderManagement/selectById2` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

// 订单发货
export function orderManagementSend(params) {
  return axios.get(agencyStr + `/api/admin/orderManagement/send` + params).then(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 根据状态查询订单
export function orderManagementSelectByCondition(params) {
  return axios
    .get(agencyStr + `/api/admin/orderManagement/selectByCondition` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

//订单发货 http://localhost:8080/api/admin/orderManagement/send
export function orderManagementSendGoods(params) {
  return axios
    .get(agencyStr + `/api/admin/orderManagement/send` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}

// 受理退款
export function orderManagementReturn(params) {
  return axios
    .get(agencyStr + `/api/admin/orderManagement/return` + params)
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
}
