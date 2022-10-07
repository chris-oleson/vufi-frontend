import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '/src/components/Login'
import PageNotFound from '/src/components/PageNotFound'
import CreateAccount from '/src/components/CreateAccount'
import Assets from '/src/components/Assets'
import Debts from '/src/components/Debts'
import NetWorth from '/src/components/NetWorth'
import Settings from '/src/components/Settings'
import UpdatePassword from '/src/components/UpdatePassword'
import UpdateEmail from '/src/components/UpdateEmail'
import DeleteAccount from '/src/components/DeleteAccount'
import Home from '/src/components/Home'
import Pricing from '/src/components/Pricing'
import About from '/src/components/About'

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
                title: 'VuFi - Finance at a Glance'
            }
        },
        {
            path: '/pricing',
            component: Pricing,
            meta: {
                title: 'Pricing | VuFi'
            }
        },
        {
            path: '/about',
            component: About,
            meta: {
                title: 'About | VuFi'
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
            path: '/update-password',
            component: UpdatePassword,
            meta: {
                title: 'Update Password | VuFi'
            }
        },
        {
            path: '/update-email',
            component: UpdateEmail,
            meta: {
                title: 'Update Email | VuFi'
            }
        },
        {
            path: '/delete-account',
            component: DeleteAccount,
            meta: {
                title: 'Delete Account | VuFi'
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