<template>
    <v-app>
        <TopBar/>
        <SideBar v-if="route.path == '/assets' || route.path == '/debts' || route.path == '/net-worth'"/>
        <v-main>
            <router-view/>
            <v-snackbar v-model="showNotification" :color="notificationColor" app transition="slide-y-transition" class="pa-0" content-class="text-center ml-2" timeout="2000">{{ notificationText }}</v-snackbar>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
const store = useStore()
import { useTheme } from 'vuetify'
const theme = useTheme()
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
import TopBar from '/src/components/TopBar.vue'
import SideBar from '/src/components/SideBar.vue'

const showNotification = ref(false)
const notificationColor = ref('')
const notificationText = ref('')

setTheme()
checkSession()

watch(route, (newRoute) => {
    document.title = newRoute.meta.title;
})

watch(() => store.state.userPrefs.theme, () => {
    setTheme()
})

watch(() => store.state.notification, (newNotification) => {
    notificationText.value = newNotification.text
    notificationColor.value = newNotification.color
    showNotification.value = true
})

function setTheme() {
    if (store.state.userPrefs.theme == 1) {
        theme.global.name.value = 'light'
    }
    else if (store.state.userPrefs.theme == 2) {
        theme.global.name.value = 'dark'
    }
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.global.name.value = 'dark'
    }
    else {
        theme.global.name.value = 'light'
    }
}

function checkSession() {
    if (store.state.isLoggedIn) {
        axios.get('auth/check-session')
        .catch(() => {
            axios.post('auth/logout').then(() => {
                store.commit('logOut')
                router.push('/')
            })
        })
    }
}
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