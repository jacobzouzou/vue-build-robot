import Vue from 'vue';
import App from './App.vue';
import router from "./router/index";
import store from "./store/index";
import pinPadding from "./shared/pin-directive";
import pinDirective from './shared/pin-directive';
import currencyFilter from "./shared/currency-filter";


Vue.config.productionTip = false;
Vue.directive("pin",pinDirective);
Vue.filter("currency",currencyFilter);


new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
