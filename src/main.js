import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueApexCharts  from 'vue-apexcharts'
import store from './store/store'
import router from './router/index'
import axios from 'axios'

axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      config.withCredentials = true;
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
);

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

// Filters

Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    return formatter.format(value);
});

new Vue({
    store,
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')