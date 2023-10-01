import { createRouter, createWebHistory } from 'vue-router'
import Login from '/src/views/Login.vue'
import PageNotFound from '/src/views/PageNotFound.vue'
import SignUp from '/src/views/SignUp.vue'
import Assets from '/src/views/Assets.vue'
import Debts from '/src/views/Debts.vue'
import Contact from '/src/views/Contact.vue'
import NetWorth from '/src/views/NetWorth.vue'
import Settings from '/src/views/Settings.vue'
import UpdatePassword from '/src/views/UpdatePassword.vue'
import UpdateEmail from '/src/views/UpdateEmail.vue'
import DeleteAccount from '/src/views/DeleteAccount.vue'
import Home from '/src/views/Home.vue'
import Pricing from '/src/views/Pricing.vue'
import About from '/src/views/About.vue'

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