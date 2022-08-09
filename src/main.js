import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueApexCharts  from 'vue-apexcharts'

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
    vuetify,
    render: h => h(App)
}).$mount('#app')