import { createRouter, createWebHistory } from 'vue-router'
import Login from '/src/views/Login'
import PageNotFound from '/src/views/PageNotFound'
import SignUp from '/src/views/SignUp'
import VerifyAccount from '/src/views/VerifyAccount'
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
import CancelSubscription from '/src/views/CancelSubscription'
import ThankYou from '/src/views/ThankYou'
import { useStore } from '/src/pinia'

export const router = createRouter({
    history: createWebHistory(),
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
            beforeEnter: [rejectUnauthorized, rejectNoSubscription],
            component: Assets,
            meta: {
                title: 'Assets - VuFi'
            }
        },
        {
            path: '/debts',
            beforeEnter: [rejectUnauthorized, rejectNoSubscription],
            component: Debts,
            meta: {
                title: 'Debts - VuFi'
            }
        },
        {
            path: '/net-worth',
            beforeEnter: [rejectUnauthorized, rejectNoSubscription],
            component: NetWorth,
            meta: {
                title: 'Net Worth - VuFi'
            }
        },
        {
            path: '/login',
            beforeEnter: () => {
                const store = useStore()
                if (store.isLoggedIn) {
                    if (store.subscriptionStatus == 'active') {
                        return { path: '/assets' }
                    }
                    else {
                        return { path: '/pricing' }
                    }
                }
            },
            component: Login,
            meta: {
                title: 'Login - VuFi'
            }
        },
        {
            path: '/signup',
            component: SignUp,
            meta: {
                title: 'Sign Up - VuFi'
            }
        },
        {
            path: '/verify-account',
            beforeEnter: rejectNoParams,
            component: VerifyAccount,
            meta: {
                title: 'Verify Account - VuFi'
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
            path: '/cancel-subscription',
            beforeEnter: rejectUnauthorized,
            component: CancelSubscription,
            meta: {
                title: 'Cancel Subscription - VuFi'
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
    ]
})

function rejectUnauthorized() {
    const store = useStore()
    if (!store.isLoggedIn) {
        return { path: '/login' }
    }
}

function rejectNoSubscription() {
    const store = useStore()
    if (store.subscriptionStatus != 'active') {
        return { path: '/pricing' }
    }
}

function rejectNoParams(to) {
    if (!Object.keys(to.query).length) {
        return { path: '/404' }
    }
}