let [agencyStr] = [""];

if (process.env.NODE_ENV == "development") {
  // 开发环境
  agencyStr = "/agencyStr";
} else if (process.env.VUE_APP_PATH_ENV == "production") {
  // 现网环境
  agencyStr = "http://127.0.0.1:3000";
} else if (process.env.VUE_APP_PATH_ENV == "test") {
  // 测试环境
  agencyStr = "http://127.0.0.1:3000";
}

export { agencyStr };
