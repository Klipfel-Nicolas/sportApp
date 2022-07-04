import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";

axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api`;
axios.defaults.withCredentials = true; //withCredential to recieve the cookie

createApp(App).use(store).use(router).mount("#app");
