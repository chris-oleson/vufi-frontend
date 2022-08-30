import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '/src/components/Login'
import PageNotFound from '/src/components/PageNotFound'
import CreateAccount from '/src/components/CreateAccount'
import Assets from '/src/components/Assets'
import Debts from '/src/components/Debts'
import NetWorth from '/src/components/NetWorth'
import Settings from '/src/components/Settings'

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
            path: '/assets',
            component: Assets,
            meta: {
                title: 'Assets'
            }
        },
        {
            path: '/debts',
            component: Debts,
            meta: {
                title: 'Debts'
            }
        },
        {
            path: '/net-worth',
            component: NetWorth,
            meta: {
                title: 'Net Worth'
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
            path: '/settings',
            component: Settings,
            meta: {
                title: 'Settings'
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