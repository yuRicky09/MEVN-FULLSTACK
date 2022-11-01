import { createApp } from "vue";
import { pinia } from "@/lib/pinia";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/css/index.css";
import { plugin, defaultConfig } from "@formkit/vue";
import "@formkit/themes/genesis";

const app = createApp(App);

app.use(plugin, defaultConfig);
app.use(pinia);
app.use(router);

app.mount("#app");
