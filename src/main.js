// Vue
import { createApp } from 'vue'
import App from '/src/App'
const app = createApp(App)

// Pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// Vue Router
import { router } from '/src/router'
app.use(router)

// Vuetify
import vuetify from '/src/vuetify'
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

if (import.meta.hot) {
    import.meta.hot.on("vite:beforeUpdate", () => {
        console.clear()
    })
}

app.mount('#app')