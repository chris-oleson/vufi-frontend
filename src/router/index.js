import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '/src/components/Login'
import PageNotFound from '/src/components/PageNotFound'
import CreateAccount from '/src/components/CreateAccount'
import Assets from '/src/components/Assets'
import Debts from '/src/components/Debts'
import NetWorth from '/src/components/NetWorth'
import Settings from '/src/components/Settings'
import Home from '/src/components/Home'

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
            component: Home,
            meta: {
                title: 'VuFi - Assets at a Glance'
            }
        },
        {
            path: '/assets',
            component: Assets,
            meta: {
                title: 'Assets | VuFi'
            }
        },
        {
            path: '/debts',
            component: Debts,
            meta: {
                title: 'Debts | VuFi'
            }
        },
        {
            path: '/net-worth',
            component: NetWorth,
            meta: {
                title: 'Net Worth | VuFi'
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: 'Login | VuFi'
            }
        },
        {
            path: '/signup',
            component: CreateAccount,
            meta: {
                title: 'Sign Up | VuFi'
            }
        },
        {
            path: '/settings',
            component: Settings,
            meta: {
                title: 'Settings | VuFi'
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