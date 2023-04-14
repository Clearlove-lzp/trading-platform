const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: process.env.VUE_APP_OUTPUTDIR,
  assetsDir: "static",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md

  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true);
    config.optimization.minimize(true);
    config.resolve.alias.set("@", path.resolve("src"));
  },
  configureWebpack: (config) => {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    proxy: {
      "/agencyStr": {
        target: "http://192.168.3.11:8080", // 本地代理
        changeOrigin: true,
        pathRewrite: {
          "^/agencyStr": "",
        },
      },
    },
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
});
