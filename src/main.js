import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ViewUIPlus from "view-ui-plus";

import VueLazyLoad from "vue-lazyload";

import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import VueVideoPlayer from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import AudioPlayer from "@liripeng/vue-audio-player";

const app = createApp(App);
// router钩子函数
router.beforeEach((to, from, next) => {
  if (
    to.path === "/admin/login" ||
    to.path === "/admin/SystemLogin" ||
    to.path === "/login" ||
    (to.path === "/admin/register") | (to.path === "/register")
  ) {
    next();
  } else {
    next();
  }
});

app
  .use(store)
  .use(router)
  .use(ViewUIPlus)
  .use(VueLazyLoad, {
    loading: require("./assets/imgs/loading-svg/loading-bars.svg"),
  })
  .use(VueViewer, {
    defaultOptions: {
      zIndex: 9999,
      title: (image, imageData) => {
        return `(${imageData.naturalWidth} × ${imageData.naturalHeight})`;
      },
    },
  })
  .use(VueVideoPlayer)
  .use(AudioPlayer)
  .mount("#app");
