import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { registerSW } from "virtual:pwa-register";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

registerSW();

import "./assets/main.css";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(router);

app.mount("#app");
