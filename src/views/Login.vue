<template>
    <v-card class="pa-10 mx-auto my-10 text-center" width="330">
        <img src="/src/assets/logo.svg" height="50" width="50" alt="VuFi logo"/>
        <v-text-field variant="underlined" label="Email" v-model="email" :error="error"/>
        <v-text-field variant="underlined" label="Password" type="password" v-model="password" :error="error" @keyup.enter="login"/>
        <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
        <v-btn width="200" rounded="0" class="bg-primary mt-4" @click="login">Log In</v-btn>
        <v-btn v-if="errorMessage == 'This account has not been verified'" width="200" size="small" variant="plain" class="font-weight-light mt-4" @click="resend">Resend Verification</v-btn>
        <v-btn width="200" size="small" variant="plain" class="mt-4 font-weight-light" to="/forgot-password">Forgot Password</v-btn>
    </v-card>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useStore } from '/src/pinia'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref(false)
const errorMessage = ref('')

function login() {
    axios.post('auth/login', {
        email: email.value,
        password: password.value
    }).then(resp => {
        store.theme = resp.data.theme
        store.currency = resp.data.currency
        store.subscriptionStatus = resp.data.subscription_status
        store.isLoggedIn = true
        store.getAllAssetData()
        router.push('/assets')
    }).catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
    })
}

function resend() {
    axios.post('auth/resend', {
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