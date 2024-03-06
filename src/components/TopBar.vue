<template>
    <v-app-bar elevation="4">
        <router-link class="mx-4 d-inline-flex align-center" to="/">
            <img src="/src/assets/logo.svg" height="50" width="50" alt="VuFi logo"/>
            <h2 class="font-weight-light ml-2">VuFi</h2>
        </router-link>
        <v-card class="font-weight-light text-warning px-2" variant="outlined">beta</v-card>

        <v-spacer/>

        <!-- Desktop display -->
        <template v-if="!smAndDown && !dashboard">
            <v-btn class="font-weight-light mr-4" variant="plain" to="/">Home</v-btn>
            <v-btn class="font-weight-light mr-4" variant="plain" to="/about">About</v-btn>
            <v-btn class="font-weight-light mr-4" variant="plain" to="/pricing">Pricing</v-btn>
            <v-btn class="font-weight-light mr-4" variant="plain" to="/contact">Contact</v-btn>
            <v-divider vertical inset></v-divider>
            <v-btn v-if="store.isLoggedIn" class="font-weight-light ml-4" variant="plain" to="/assets">Dashboard</v-btn>
            <v-btn v-if="!store.isLoggedIn" class="font-weight-light mx-4" variant="plain" to="/login">Log In</v-btn>
            <router-link to="/signup"><v-btn v-if="!store.isLoggedIn" class="bg-primary mr-4" rounded="0">Sign Up</v-btn></router-link>
        </template>

        <!-- Mobile display -->
        <v-menu v-if="smAndDown && !dashboard" offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-menu" class="mr-2" v-bind="props"/>
            </template>
            <v-list class="font-weight-light pa-0" width="200">
                <v-list-item to="/">Home</v-list-item>
                <v-list-item to="/about">About</v-list-item>
                <v-list-item to="/pricing">Pricing</v-list-item>
                <v-list-item to="/contact">Contact</v-list-item>
                <v-divider class="mx-2"></v-divider>
                <v-list-item v-if="store.isLoggedIn && store.subscriptionStatus == 'Active'" to="/assets">Dashboard</v-list-item>
                <v-list-item v-if="!store.isLoggedIn" to="/login">Log In</v-list-item>
                <v-list-item v-if="!store.isLoggedIn" class="text-primary" to="/signup">Sign Up</v-list-item>
            </v-list>
        </v-menu>

        <v-btn v-if="store.isLoggedIn" variant="plain" @click="store.privacy = !store.privacy" :icon="store.privacy ? 'mdi-eye' : 'mdi-eye-off'"></v-btn>

        <!-- Dashboard menu -->
        <v-menu v-if="store.isLoggedIn" offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-account" class="mr-2" variant="plain" v-bind="props"/>
            </template>
            <v-list class="font-weight-light pa-0">
                <v-list-item slim prepend-icon="mdi-account">{{ store.name }}</v-list-item>
                <v-divider></v-divider>
                <v-list-item slim prepend-icon="mdi-cog" to="/settings">Settings</v-list-item>
                <v-list-item slim prepend-icon="mdi-email-outline" to="/contact">Support</v-list-item>
                <v-list-item slim prepend-icon="mdi-logout" @click="logOut">Log out</v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import axios from 'axios'
import { useStore } from '/src/pinia'
const store = useStore()
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

const dashboard = computed(() => {
    if (route.path == '/assets' || route.path == '/debts' || route.path == '/net-worth') {
        return true
    }
    else {
        return false
    }
})

function logOut() {
    axios.post('auth/logout').then(() => {
        router.push('/')
        store.$reset()
    })
}
</script>