import Vue from "vue";
import injector from "vue-inject";
import VueRx from "vue-rx";
import Rx from "rxjs/Rx";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(injector, VueRx, Rx);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
