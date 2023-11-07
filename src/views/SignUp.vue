<template>
    <v-card class="pa-10 mx-auto my-10 text-center" width="330" elevation="4">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
        <template v-if="!accountCreated">
            <v-text-field variant="underlined" label="Name" :error="error" v-model="name"></v-text-field>
            <v-text-field variant="underlined" label="Email" :error="error" v-model="email"/>
            <v-text-field variant="underlined" label="Password" type="password" :error="error" v-model="password"/>
            <v-text-field variant="underlined" label="Confirm Password" type="password" :error="error" v-model="confirmPassword" @keyup.enter="createAccount"/>
            <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
            <v-btn v-if="errorMessage == 'This email already exists'" width="200" size="small" rounded="0" class="bg-error mt-4" to="/forgot-password">Forgot Password?</v-btn>
            <v-btn width="200" rounded="0" class="bg-primary my-4" @click="createAccount">Create Account</v-btn>
        </template>
        <template v-else>
            <v-card-text class="pa-0 mt-4 font-weight-light">Your account has been created!</v-card-text>
            <v-card-text class="pa-0 mt-4 font-weight-light">We have sent you an email in order to verify your email address.</v-card-text>
            <v-card-text class="pa-0 mt-4 font-weight-light">Please verify your account before logging in.</v-card-text>
        </template>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const name = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const error = ref(false)
const errorMessage = ref("")
const accountCreated = ref(true)

async function createAccount() {
    // Add user to the database
    await axios.post('auth/create', {
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
    })
    .then(() => {
        error.value = false
        errorMessage.value = ""
        accountCreated.value = true
    })
    .catch((err) => {
        errorMessage.value = err.response.data
        error.value = true
    })
}
</script>