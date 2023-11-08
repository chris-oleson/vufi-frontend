<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
        <v-card-text v-if="verified" class="pa-0 font-weight-light">Successfully verified your email! You can now log into your account.</v-card-text>
        <v-card-text v-if="error" class="pa-0 font-weight-light text-error">Sorry, we were unable to verify your account.</v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

const verified = ref(false)
const error = ref(false)

if (route.query.t && route.query.e) {
    verifyAccount()
}
else {
    router.push('/404')
}

async function verifyAccount() {
    await axios.patch('auth/verify-account', {
        token: route.query.t,
        email: route.query.e,
    }).then(() => {
        verified.value = true
    }).catch((err) => {
        error.value = true
    })
}
</script>