import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import registerAntDesign from "./registerAntDesign";
const app = createApp(App);
// 批量注册ant design组件
app.use(registerAntDesign);
app.use(store).use(router).mount("#app");
