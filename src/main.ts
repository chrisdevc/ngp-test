import Vue from "vue";
import injector from "vue-inject";
import Rx from "rxjs/Rx";
import VueRx from "vue-rx";
import VueLodash from "vue-lodash";
import VueGridLayout from "vue-grid-layout";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueRx, Rx);
Vue.use(injector);
Vue.use(VueGridLayout);
Vue.use(VueMaterial);
Vue.use(VueLodash);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
