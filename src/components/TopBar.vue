<template>
    <v-app-bar elevation="4">
        <router-link class="d-inline-flex align-center mx-4" to="/">
            <img src="/logo.svg" height="50"/>
            <h2 class="font-weight-light ml-2">VuFi</h2>
        </router-link>
        <v-card class="font-weight-light text-error px-2" variant="outlined">alpha</v-card>

        <v-spacer/>

        <!-- Desktop display -->
        <template v-if="!smAndDown && !usingApp">
            <v-btn class="font-weight-light mr-4" variant="plain" to="/">Home</v-btn>
            <v-btn class="font-weight-light mr-4" variant="plain" to="/pricing">Pricing</v-btn>
            <v-btn class="font-weight-light mr-4" variant="plain" to="/about">About</v-btn>
            <v-btn class="font-weight-light mr-4" variant="plain" to="/contact">Contact</v-btn>
            <v-divider vertical inset></v-divider>
            <v-btn v-if="store.state.isLoggedIn && store.state.subscriptionStatus == 'active'" class="font-weight-light ml-4" variant="plain" to="/assets">Dashboard</v-btn>
            <v-btn v-if="!store.state.isLoggedIn" class="font-weight-light mx-4" variant="plain" to="/login">Log In</v-btn>
            <v-btn v-if="!store.state.isLoggedIn" class="bg-primary mr-4" disabled rounded="0" to="/signup">Sign Up</v-btn>
        </template>

        <!-- Mobile display -->
        <v-menu v-if="smAndDown && !usingApp" offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-menu" variant="plain" class="ma-0" size="x-large" v-bind="props"/>
            </template>
            <v-list class="font-weight-light" width="200">
                <v-list-item class="font-weight-light" variant="plain" to="/">Home</v-list-item>
                <v-list-item class="font-weight-light" variant="plain" to="/pricing">Pricing</v-list-item>
                <v-list-item class="font-weight-light" variant="plain" to="/about">About</v-list-item>
                <v-list-item class="font-weight-light" variant="plain" to="/contact">Contact</v-list-item>
                <v-divider class="mx-2"></v-divider>
                <v-list-item v-if="store.state.isLoggedIn && store.state.subscriptionStatus == 'active'" class="font-weight-light" variant="plain" to="/assets">Dashboard</v-list-item>
                <v-list-item v-if="!store.state.isLoggedIn" class="font-weight-light" variant="plain" to="/login">Log In</v-list-item>
                <v-list-item v-if="!store.state.isLoggedIn" disabled class="font-weight-light text-primary" to="/signup">Sign Up</v-list-item>
            </v-list>
        </v-menu>

        <v-menu v-if="store.state.isLoggedIn" offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-cog" variant="plain" size="x-large" class="mr-1" v-bind="props"/>
            </template>
            <v-list class="font-weight-light" width="200">
                <v-list-item prepend-icon="mdi-cog" variant="plain" to="/settings">Settings</v-list-item>
                <v-list-item prepend-icon="mdi-email-outline" variant="plain" to="/contact">Support</v-list-item>
                <v-list-item prepend-icon="mdi-logout" variant="plain" @click="logOut">Log out</v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
const store = useStore()
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

const usingApp = ref(false)
if (route.path == '/assets' || route.path == '/debts' || route.path == '/net-worth') {
    usingApp.value = true
}
else {
    usingApp.value = false
}

function logOut() {
    axios.post('auth/logout').then(() => {
        store.commit('logOut')
        router.push('/')
    })
}
</script>