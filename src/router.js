import { createRouter, createWebHistory } from 'vue-router'
import Login from '/src/views/Login.vue'
import PageNotFound from '/src/views/PageNotFound.vue'
import SignUp from '/src/views/SignUp.vue'
import VerifyAccount from '/src/views/VerifyAccount.vue'
import Assets from '/src/views/Assets.vue'
import Debts from '/src/views/Debts.vue'
import Contact from '/src/views/Contact.vue'
import NetWorth from '/src/views/NetWorth.vue'
import Settings from '/src/views/Settings.vue'
import ForgotPassword from '/src/views/ForgotPassword.vue'
import ChangePassword from '/src/views/ChangePassword.vue'
import ChangeEmail from '/src/views/ChangeEmail.vue'
import DeleteAccount from '/src/views/DeleteAccount.vue'
import Home from '/src/views/Home.vue'
import Pricing from '/src/views/Pricing.vue'
import About from '/src/views/About.vue'
import CancelSubscription from '/src/views/CancelSubscription.vue'
import store from './store'

export default createRouter({
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
                if (store.state.isLoggedIn) {
                    if (store.state.subscriptionStatus == 'active') {
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
    ]
})

function rejectUnauthorized() {
    if (!store.state.isLoggedIn) {
        return { path: '/login' }
    }
}

function rejectNoSubscription() {
    if (!store.state.subscriptionStatus == 'active') {
        return { path: '/pricing' }
    }
}

function rejectNoParams(to) {
    if (!Object.keys(to.query).length) {
        return { path: '/404' }
    }
}