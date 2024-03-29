import { createRouter, createWebHistory } from 'vue-router'
import Login from '/src/views/Login'
import PageNotFound from '/src/views/PageNotFound'
import SignUp from '/src/views/SignUp'
import Assets from '/src/views/Assets'
import Debts from '/src/views/Debts'
import Contact from '/src/views/Contact'
import NetWorth from '/src/views/NetWorth'
import Settings from '/src/views/Settings'
import ForgotPassword from '/src/views/ForgotPassword'
import ChangePassword from '/src/views/ChangePassword'
import ChangeEmail from '/src/views/ChangeEmail'
import DeleteAccount from '/src/views/DeleteAccount'
import Home from '/src/views/Home'
import Pricing from '/src/views/Pricing'
import About from '/src/views/About'
import ThankYou from '/src/views/ThankYou'
import PrivacyPolicy from '/src/views/PrivacyPolicy'
import { useStore } from '/src/pinia'

export const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
        return { top: 0 }
    },
    routes: [
        {
            path: '/404',
            alias: '/:pathMatch(.*)*',
            component: PageNotFound,
            meta: {
                title: '404 - VuFi'
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
                title: 'Pricing - VuFi'
            }
        },
        {
            path: '/about',
            component: About,
            meta: {
                title: 'About - VuFi'
            }
        },
        {
            path: '/contact',
            component: Contact,
            meta: {
                title: 'Contact - VuFi'
            }
        },
        {
            path: '/assets',
            beforeEnter: [rejectUnauthorized],
            component: Assets,
            meta: {
                title: 'Assets - VuFi'
            }
        },
        {
            path: '/debts',
            beforeEnter: [rejectUnauthorized],
            component: Debts,
            meta: {
                title: 'Debts - VuFi'
            }
        },
        {
            path: '/net-worth',
            beforeEnter: [rejectUnauthorized],
            component: NetWorth,
            meta: {
                title: 'Net Worth - VuFi'
            }
        },
        {
            path: '/login',
            beforeEnter: forwardLogin,
            component: Login,
            meta: {
                title: 'Login - VuFi'
            }
        },
        {
            path: '/signup',
            beforeEnter: forwardLogin,
            component: SignUp,
            meta: {
                title: 'Sign Up - VuFi'
            }
        },
        {
            path: '/settings',
            beforeEnter: rejectUnauthorized,
            component: Settings,
            meta: {
                title: 'Settings - VuFi'
            }
        },
        {
            path: '/forgot-password',
            component: ForgotPassword,
            meta: {
                title: 'Forgot Password - VuFi'
            }
        },
        {
            path: '/change-password',
            beforeEnter: (to) => {
                const store = useStore()
                if (!store.isLoggedIn && !to.query.t) {
                    return { path: '/404' }
                }
            },
            component: ChangePassword,
            meta: {
                title: 'Change Password - VuFi'
            }
        },
        {
            path: '/change-email',
            beforeEnter: rejectUnauthorized,
            component: ChangeEmail,
            meta: {
                title: 'Change Email - VuFi'
            }
        },
        {
            path: '/delete-account',
            beforeEnter: rejectUnauthorized,
            component: DeleteAccount,
            meta: {
                title: 'Delete Account - VuFi'
            }
        },
        {
            path: '/thank-you',
            beforeEnter: rejectUnauthorized,
            component: ThankYou,
            meta: {
                title: 'Thank You - VuFi'
            }
        },
        {
            path: '/privacy',
            component: PrivacyPolicy,
            meta: {
                title: 'Privacy Policy - VuFi'
            }
        },
    ]
})

function rejectUnauthorized() {
    const store = useStore()
    if (!store.isLoggedIn) {
        return { path: '/login' }
    }
}

function forwardLogin(to) {
    const store = useStore()
    if (store.isLoggedIn && !to.query.t) {
        return { path: '/assets' }
    }
}