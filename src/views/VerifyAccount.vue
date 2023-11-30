<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/src/assets/logo.svg" height="50" width="50" alt="VuFi logo"/>
        <v-card-text v-if="verified" class="pa-0 font-weight-light">Successfully verified your email! You can now log into your account.</v-card-text>
        <v-card-text v-if="error" class="pa-0 text-error">Sorry, we were unable to verify your account.</v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
const route = useRoute()

const verified = ref(false)
const error = ref(false)

if (route.query.t) {
    verifyAccount()
}

function verifyAccount() {
    axios.patch('auth/verify', {
        token: route.query.t,
    }).then(() => {
        verified.value = true
    }).catch(() => {
        error.value = true
    })
}
</script>