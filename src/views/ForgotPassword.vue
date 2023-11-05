<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
        <v-card-text class="font-weight-light mt-4 pa-0">Request a password reset for the account linked to the email address below.</v-card-text>
        <v-text-field variant="underlined" class="mt-4" label="Email" type="email" :error="errorState" v-model="email"></v-text-field>
        <v-card-text v-if="errorState" class="text-error pa-0" :error="errorState">Please enter a valid email address</v-card-text>
        <v-card-text v-if="successful" class="pa-0 my-4 font-weight-light">A password reset link will be sent to the entered email address if the account exists.</v-card-text>
        <v-btn rounded="0" class="bg-primary mt-4" width="200" @click="sendEmail">Send</v-btn>
    </v-card>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const email = ref("")
const errorState = ref(false)
const successful = ref(false)

async function sendEmail() {
    await axios.post('auth/forgot-password', {
        email: email.value
    })
    .then(() => {
        errorState.value = false
        successful.value = true
    })
    .catch(() => {
        errorState.value = true
    })
}
</script>