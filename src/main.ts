import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { registerSW } from "virtual:pwa-register";
import { createPersistedState } from "pinia-plugin-persistedstate";

registerSW();

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia().use(createPersistedState()));
app.use(router);

app.mount("#app");
