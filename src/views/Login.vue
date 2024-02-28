<template>
    <v-card class="pa-10 mx-auto my-10 text-center" width="330">
        <img src="/src/assets/logo.svg" height="50" width="50" alt="VuFi logo"/>
        <v-progress-circular v-if="loading" class="mt-4 mx-auto d-block" indeterminate></v-progress-circular>
        <v-card-text v-else-if="error && route.query.t" class="text-error pa-0 mt-4">{{ errorMessage }}</v-card-text>
        <template v-else>
            <v-text-field id="email" variant="underlined" label="Email" v-model="email" :error="error"/>
            <v-text-field :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" variant="underlined" label="Password" :type="showPassword ? 'text' : 'password'" v-model="password" :error="error" @click:append="showPassword = !showPassword" @keyup.enter="login"/>
            <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
            <v-btn width="200" rounded="0" class="bg-primary mt-4" @click="login">Log In</v-btn>
            <v-btn v-if="errorMessage == 'This account has not been verified'" width="200" size="small" variant="plain" class="font-weight-light mt-4" @click="resend">Resend Verification</v-btn>
            <v-btn width="200" size="small" variant="plain" class="mt-4 font-weight-light" :to="'/forgot-password?e=' + email">Forgot Password</v-btn>
        </template>
    </v-card>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useStore } from '/src/pinia'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref(false)
const errorMessage = ref('')
const loading = ref(false)

if (route.query.t) {
    verify()
}

onMounted(() => {
    if (document.getElementById('email')) {
        document.getElementById('email').focus()
    }
})

function login() {
    loading.value = true
    error.value = false
    axios.post('/auth/login', {
        email: email.value,
        password: password.value,
    }).then(async (resp) => {
        store.theme = resp.data.theme
        store.currency = resp.data.currency
        store.subscriptionStatus = getSubscriptionStatus(resp.data.expires)
        store.isLoggedIn = true
        await store.getAllAssetData()
        router.push('/assets')
    }).catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
        loading.value = false
    })
}

function getSubscriptionStatus(expiration) {
    if (!expiration) {
        return 'Free'
    }
    else if (expiration >= new Date()) {
        return 'Active'
    }
    else {
        return 'Canceled'
    }
}

function verify() {
    loading.value = true
    axios.post('/auth/verify', {
        token: route.query.t,
        email: route.query.e
    }).then(() => {
        store.isLoggedIn = true
        store.getAllAssetData()
        store.notification = {
            text: "Successfully verified email!",
            color: "primary"
        }
        router.push('/assets')
    }).catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
        loading.value = false
    })
}

function resend() {
    axios.post('/auth/resend', {
        email: email.value
    }).then(() => {
        store.notification = {
            text: "Resent email verification",
            color: "primary"
        }
    }).catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
    })
}
</script>