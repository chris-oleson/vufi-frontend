<template>
    <v-card class="pa-10 mx-auto my-10 text-center" width="330">
        <img src="/src/assets/logo.svg" height="50" width="50" alt="VuFi logo"/>
        <v-progress-circular v-if="loading" class="mt-4 mx-auto d-block" indeterminate></v-progress-circular>
        <template v-else-if="accountCreated">
            <v-card-text class="pa-0 mt-4 font-weight-light">Your account has been created!</v-card-text>
            <v-card-text class="pa-0 mt-4 font-weight-light">We have sent you an email in order to verify your email address.</v-card-text>
            <v-card-text class="pa-0 mt-4 font-weight-light">Please verify your account before logging in.</v-card-text>
        </template>
        <template v-else>
            <v-text-field id="name" variant="underlined" label="Name" :error="error" v-model="name"></v-text-field>
            <v-text-field variant="underlined" label="Email" :error="error" v-model="email"/>
            <v-text-field variant="underlined" label="Password" type="password" :error="error" v-model="password" @keyup.enter="createAccount"/>
            <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
            <v-btn v-if="errorMessage == 'This email already exists'" width="200" size="small" rounded="0" class="bg-error mt-4" to="/forgot-password">Forgot Password?</v-btn>
            <v-btn width="200" rounded="0" class="bg-primary mt-4" @click="createAccount">Create Account</v-btn>
        </template>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref(false)
const errorMessage = ref('')
const accountCreated = ref(false)
const loading = ref(false)

onMounted(() => {
    document.getElementById('name').focus()
})

function createAccount() {
    loading.value = true
    axios.post('/auth/create', {
        name: name.value,
        email: email.value,
        password: password.value,
    })
    .then(() => {
        accountCreated.value = true
        loading.value = false
    })
    .catch((err) => {
        errorMessage.value = err.response.data
        error.value = true
        loading.value = false
    })
}
</script>