<template>
    <v-card class="pa-10 mx-auto my-10 text-center" width="330" elevation="4">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
        <v-text-field variant="underlined" label="Name" :error="error" v-model="name"></v-text-field>
        <v-text-field variant="underlined" label="Email" :error="error" v-model="email"/>
        <v-text-field variant="underlined" label="Password" type="password" :error="error" v-model="password"/>
        <v-text-field variant="underlined" label="Confirm Password" type="password" :error="error" v-model="confirmPassword" @keyup.enter="createAccount"/>
        <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
        <v-btn v-if="errorMessage == 'This email already exists'" width="200" size="small" rounded="0" class="bg-error mt-4" to="/forgot-password">Forgot Password?</v-btn>
        <v-btn width="200" rounded="0" class="bg-primary my-4" @click="createAccount">Create Account</v-btn>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()

const name = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const error = ref(false)
const errorMessage = ref("")

async function createAccount() {
    // Add user to the database
    await axios.post('auth/create', {
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
    })
    .then(() => {
        login()
    })
    .catch((err) => {
        errorMessage.value = err.response.data
        error.value = true
    })
}

async function login() {
    // Send login data to backend for validation
    await axios.post('auth/login', {
        email: email.value,
        password: password.value,
    }).then(resp => {
        store.commit('logIn')
        router.push('/pricing')
    }).catch((err) => {
        console.log(err.message)
    })
}
</script>