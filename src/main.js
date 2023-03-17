import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ViewUIPlus from "view-ui-plus";

import VueLazyLoad from "vue-lazyload";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(ViewUIPlus)
  .use(VueLazyLoad, {
    loading: require("./assets/imgs/loading-svg/loading-bars.svg"),
  })
  .mount("#app");
