<template>
    <v-app>
        <TopBar/>
        <SideBar v-if="route.path == '/assets' || route.path == '/debts' || route.path == '/net-worth'"/>
        <v-main>
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
import { ref, watch } from 'vue'
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

// Make sure there's an active session on login
checkSession()
function checkSession() {
    if (store.isLoggedIn) {
        axios.post('auth/check-session').catch(() => {
            store.$reset()
            if (route.path != '/') {
                router.push('/login')
            }
        })
    }
}

// Auto logout after 15 minutes of inactivity
let timeout = setTimeout(logOut, 15 * 60 * 1000)
addEventListener("click", resetTimeout)

function resetTimeout() {
    clearTimeout(timeout)
    timeout = setTimeout(logOut, 15 * 60 * 1000)
}

function logOut() {
    axios.post('auth/logout').then(() => {
        router.push('/login')
        store.$reset()
    })
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
</script>

<style>
/* Text selection color */
::selection {
    background: #83af50
}
::-moz-selection {
    background: #83af50
}

/* Removing default link styling */
a {
    color: inherit;
    text-decoration: inherit;
}
</style>