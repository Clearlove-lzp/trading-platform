let [api, code] = ["", ""];

if (process.env.NODE_ENV == "development") {
  // 开发环境
  api = "/api";
  code = "/code";
} else if (process.env.VUE_APP_PATH_ENV == "production") {
  // 现网环境
  api = "http://127.0.0.1:3000/api";
  code = "http://127.0.0.1:3000/code";
} else if (process.env.VUE_APP_PATH_ENV == "test") {
  // 测试环境
  api = "http://127.0.0.1:3000/api";
  code = "http://127.0.0.1:3000/code";
}

export { api, code };
