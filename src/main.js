// Vue
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// Vuex
import store from './store'
app.use(store)

// Vue Router
import router from './router'
app.use(router)

// Vuetify
import vuetify from './vuetify'
app.use(vuetify)

// ApexCharts
import VueApexCharts from "vue3-apexcharts"
app.use(VueApexCharts)

// Axios
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_URL
axios.interceptors.request.use(
    function(config) {
        config.withCredentials = true
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)

app.mount('#app')