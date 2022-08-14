import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '/src/components/Dashboard'
import Login from '/src/components/Login'

Vue.use(VueRouter)

export default new VueRouter ({
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                title: 'Dashboard'
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: 'Login'
            }
        },
    ]
})