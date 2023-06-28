import { createRouter, createWebHistory } from 'vue-router'
import Login from '/src/components/Login'
import PageNotFound from '/src/components/PageNotFound'
import SignUp from '/src/components/SignUp'
import Assets from '/src/components/Assets'
import Debts from '/src/components/Debts'
import Contact from '/src/components/Contact'
import NetWorth from '/src/components/NetWorth'
import Settings from '/src/components/Settings'
import UpdatePassword from '/src/components/UpdatePassword'
import UpdateEmail from '/src/components/UpdateEmail'
import DeleteAccount from '/src/components/DeleteAccount'
import Home from '/src/components/Home'
import Pricing from '/src/components/Pricing'
import About from '/src/components/About'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/404',
            alias: '/:pathMatch(.*)*',
            component: PageNotFound,
            meta: {
                title: '404 | VuFi'
            }
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
            path: '/contact',
            component: Contact,
            meta: {
                title: 'Contact | VuFi'
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
            component: SignUp,
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
    ]
})