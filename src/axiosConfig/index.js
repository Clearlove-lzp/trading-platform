import axios from "axios";

import { Message } from "view-ui-plus";

// 请求超时时间
// axios.defaults.timeout = 10000;

// post请求头
// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// request拦截器
axios.interceptors.request.use(
  (config) => {
    // 兼容ie的get请求默认读取缓存的问题
    let url = config.url;
    if (config.method === "get") {
      url.indexOf("?") === -1
        ? (config.url = url + "?_=" + new Date().getTime())
        : (config.url = url + "&_=" + new Date().getTime());
    }
    // 兼容ie对请求地址含中文
    config.url = encodeURI(config.url);
    // config.url = encodeURIComponent(config.url);
    // console.log('222222wwwwwww', config.url);
    // 让每个请求携带token--['token']为自定义key
    let token = localStorage.getItem("token");
    Object.assign(config.headers, {
      token: token,
    });
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// respone拦截器
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // console.log(error.response)
      Message.error(error.response.status + "：" + error.response.statusText);
      // Message({
      //   message: error.response.statusText,
      //   type: 'error',
      //   duration: 5 * 1000
      // });
    }
    // this.$Message.error('服务器繁忙，请稍后重试');
    return Promise.reject(error);
  }
);

export default axios;

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}

////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: param,
      })
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
