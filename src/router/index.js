import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '/src/components/Dashboard'
import Login from '/src/components/Login'
import PageNotFound from '/src/components/PageNotFound'
import CreateAccount from '/src/components/CreateAccount'

Vue.use(VueRouter)

export default new VueRouter ({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/404',
        },
        {
            path: '/',
            meta: {
                title: 'Home'
            }
        },
        {
            path: '/dashboard',
            component: Dashboard,
            meta: {
                title: 'Dashboard'
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: 'Login'
            }
        },
        {
            path: '/create-account',
            component: CreateAccount,
            meta: {
                title: 'Create Account'
            }
        },
        {
            path: '/404',
            component: PageNotFound,
            meta: {
                title: '404'
            }
        },
    ]
})