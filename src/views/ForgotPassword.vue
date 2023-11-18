<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
        <v-card-text class="font-weight-light mt-4 pa-0">Request a password reset for the account linked to the email address below.</v-card-text>
        <v-text-field v-if="!success" variant="underlined" class="mt-4" label="Email" type="email" :error="error" v-model="email" @keyup.enter="sendEmail"></v-text-field>
        <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>        
        <v-btn v-if="!success" rounded="0" class="bg-primary mt-4" width="200" @click="sendEmail">Send</v-btn>
        <v-divider v-if="success" class="my-4"></v-divider>
        <v-card-text v-if="success" class="pa-0 mt-4 font-weight-light">A password reset link will be sent to the entered email address.</v-card-text>
    </v-card>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const email = ref('')
const errorMessage = ref('')
const error = ref(false)
const success = ref(false)

function sendEmail() {
    axios.post('auth/forgot', {
        email: email.value
    })
    .then(() => {
        error.value = false
        errorMessage.value = ''
        success.value = true
    })
    .catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
    })
}
</script>