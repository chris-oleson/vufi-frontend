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
                title: '404'
            }
        },
        {
            path: '/',
            component: Home,
        },
        {
            path: '/pricing',
            component: Pricing,
            meta: {
                title: 'Pricing'
            }
        },
        {
            path: '/about',
            component: About,
            meta: {
                title: 'About'
            }
        },
        {
            path: '/contact',
            component: Contact,
            meta: {
                title: 'Contact'
            }
        },
        {
            path: '/assets',
            beforeEnter: [rejectUnauthorized],
            component: Assets,
            meta: {
                title: 'Assets'
            }
        },
        {
            path: '/debts',
            beforeEnter: [rejectUnauthorized],
            component: Debts,
            meta: {
                title: 'Debts'
            }
        },
        {
            path: '/net-worth',
            beforeEnter: [rejectUnauthorized],
            component: NetWorth,
            meta: {
                title: 'Net Worth'
            }
        },
        {
            path: '/login',
            beforeEnter: forwardLogin,
            component: Login,
            meta: {
                title: 'Login'
            }
        },
        {
            path: '/signup',
            beforeEnter: forwardLogin,
            component: SignUp,
            meta: {
                title: 'Sign Up'
            }
        },
        {
            path: '/settings',
            beforeEnter: rejectUnauthorized,
            component: Settings,
            meta: {
                title: 'Settings'
            }
        },
        {
            path: '/forgot-password',
            component: ForgotPassword,
            meta: {
                title: 'Forgot Password'
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
                title: 'Change Password'
            }
        },
        {
            path: '/change-email',
            beforeEnter: rejectUnauthorized,
            component: ChangeEmail,
            meta: {
                title: 'Change Email'
            }
        },
        {
            path: '/delete-account',
            beforeEnter: rejectUnauthorized,
            component: DeleteAccount,
            meta: {
                title: 'Delete Account'
            }
        },
        {
            path: '/thank-you',
            beforeEnter: rejectUnauthorized,
            component: ThankYou,
            meta: {
                title: 'Thank You'
            }
        },
        {
            path: '/privacy',
            component: PrivacyPolicy,
            meta: {
                title: 'Privacy Policy'
            }
        },
    ]
})

router.afterEach(to => {
    if (to.meta.title) {
      document.title = `${to.meta.title} - VuFi`;
    }
    else {
        document.title = 'VuFi - Finance at a Glance'
    }
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