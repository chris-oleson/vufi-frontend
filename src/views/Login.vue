<template>
    <v-card class="pa-10 mx-auto my-10 text-center" width="330" elevation="4">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>

        <v-text-field class="mt-4" variant="underlined" label="Email" v-model="email" :error="error"/>
        <v-text-field variant="underlined" label="Password" type="password" v-model="password" :error="error" @keyup.enter="login"/>

        <v-card-text v-if="error" class="text-error pa-0">Incorrect email or password</v-card-text>
        
        <v-btn width="200" rounded="0" class="bg-primary mt-4" @click="login">Log In</v-btn>
        <v-btn width="200" size="small" variant="plain" class="mt-4 font-weight-light" to="/forgot-password">Forgot Password</v-btn>
    </v-card>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref(false)

async function login() {
    // Send login data to backend for validation
    await axios.post('auth/login', {
        email: email.value,
        password: password.value
    }).then(resp => {
        store.commit('logIn', resp.data[0])
        if (store.state.subscriptionStatus == "active") {
            store.dispatch('getAllAssetData')
            router.push('/assets')
        }
        else {
            router.push('/pricing')
        }
    }).catch(() => {
        error.value = true
    })
}
</script>