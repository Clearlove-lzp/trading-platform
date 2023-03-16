import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ViewUIPlus from "view-ui-plus";

const app = createApp(App);

app.use(store).use(router).use(ViewUIPlus).mount("#app");
