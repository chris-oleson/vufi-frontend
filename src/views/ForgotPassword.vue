<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
        <v-card-text class="font-weight-light mt-4 pa-0">Request a password reset for the account linked to the email address below.</v-card-text>
        <v-text-field v-if="!success" variant="underlined" class="mt-4" label="Email" type="email" :error-messages="errorMessage" v-model="email" @keyup.enter="sendEmail"></v-text-field>
        <v-btn v-if="!success" rounded="0" class="bg-primary mt-4" width="200" @click="sendEmail">Send</v-btn>
        <v-divider v-if="success" class="my-4"></v-divider>
        <v-card-text v-if="success" class="pa-0 mt-4 font-weight-light">A password reset link will be sent to the entered email address if the account exists.</v-card-text>
    </v-card>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const email = ref("")
const errorMessage = ref("")
const success = ref(false)

async function sendEmail() {
    await axios.post('auth/forgot-password', {
        email: email.value
    })
    .then(() => {
        errorMessage.value = ""
        success.value = true
    })
    .catch(() => {
        errorMessage.value = "Please enter a valid email address"
    })
}
</script>