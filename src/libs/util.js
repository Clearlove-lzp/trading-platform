import { objEqual } from "./tools";
import CryptoJS from "crypto-js";

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {};
  const params2 = route2.params || {};
  const query1 = route1.query || {};
  const query2 = route2.query || {};
  return (
    route1.name === route2.name &&
    objEqual(params1, params2) &&
    objEqual(query1, query2)
  );
};

export const encrypt = (word, keyStr) => {
  // 加密
  keyStr = keyStr ? keyStr : "725315f4-59e9-44c7-8d4f-2193d1e28ed7";
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.DES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const decrypt = (word, keyStr) => {
  // 解密
  keyStr = keyStr ? keyStr : "725315f4-59e9-44c7-8d4f-2193d1e28ed7";
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let decrypt = CryptoJS.DES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};

//将多个object合并为一个object, 参数为数组，每个元素为一个嵌套的object
export const flattenObject = (data) => {
  let res = [];
  data.forEach(element => {
    let obj = {}
    for (let e in element){
      Object.assign(obj, element[e])
    }
    res.push(obj)
  });
  return res;
};
