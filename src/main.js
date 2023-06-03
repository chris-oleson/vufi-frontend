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
app.config.globalProperties.$vuetify = vuetify
app.use(vuetify)

// ApexCharts
import VueApexCharts from "vue3-apexcharts"
app.use(VueApexCharts)

// Axios
import axios from 'axios'
app.config.globalProperties.$axios = axios

app.mount('#app')