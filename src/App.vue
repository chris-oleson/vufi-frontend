<template>
    <v-app>
        <TopBar/>
        <SideBar v-if="usingApp"/>
        <v-main>
            <v-banner v-if="usingApp && store.reauthenticate" lines="one" class="bg-warning" text="One or more of your accounts needs to be reauthenticated to continue updating.">
                <template v-slot:actions>
                    <PlaidLink update="true"></PlaidLink>
                </template>
            </v-banner>
            <router-view/>
            <v-snackbar v-model="showNotification" :color="notificationColor" app transition="slide-y-transition" timeout="3000">
                <template v-slot:text>
                    <div class="text-center">{{ notificationText }}</div>
                </template>
            </v-snackbar>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import axios from 'axios'
import { useStore } from '/src/pinia'
const store = useStore()
import { useTheme } from 'vuetify'
const theme = useTheme()
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
import TopBar from '/src/components/TopBar'
import SideBar from '/src/components/SideBar'
import PlaidLink from '/src/components/PlaidLink.vue';

// Make sure there's an active session
checkSession()
function checkSession() {
    if (store.isLoggedIn) {
        axios.post('auth/check-session').catch(() => {
            store.$reset()
            router.push('/login')
        })
    }
}

// Auto logout after 30 minutes
setTimeout(logOut, 30 * 60 * 1000)
function logOut() {
    if (store.isLoggedIn) {
        axios.post('auth/logout')
        store.$reset()
        router.push('/login')
    }
}

// Update site title when page changes
watch(route, (newRoute) => {
    document.title = newRoute.meta.title
})

// Update current theme
setTheme()
watch(() => store.theme, () => {
    setTheme()
})

function setTheme() {
    if (store.theme == 1) {
        theme.global.name.value = 'light'
    }
    else if (store.theme == 2) {
        theme.global.name.value = 'dark'
    }
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.global.name.value = 'dark'
    }
    else {
        theme.global.name.value = 'light'
    }
}

// Handling notifications
const showNotification = ref(false)
const notificationColor = ref('')
const notificationText = ref('')
watch(() => store.notification, (newNotification) => {
    if (newNotification.text) {
        notificationText.value = newNotification.text
        notificationColor.value = newNotification.color
        showNotification.value = true
    }
})

const usingApp = computed(() => {
    if (route.path == '/assets' || route.path == '/debts' || route.path == '/net-worth') {
        return true
    }
    return false
})
</script>

<style>
/* Removing default link styling */
a {
    color: inherit;
    text-decoration: inherit;
}

/* Privacy mode */
.blur {
    color: transparent;
    text-shadow: 0 0 10px #000;
}
</style>