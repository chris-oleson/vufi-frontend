<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/src/assets/logo.svg" height="50" width="50" alt="VuFi logo"/>
        <v-text-field v-if="!route.query.t" variant="underlined" class="mt-4" label="Current Password" type="password" :error="error" v-model="currentPassword"></v-text-field>
        <v-text-field variant="underlined" label="New Password" type="password" :error="error" v-model="newPassword"></v-text-field>
        <v-text-field variant="underlined" label="Confirm Password" type="password" :error="error" v-model="confirmPassword"></v-text-field>
        <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
        <v-btn rounded="0" class="bg-primary mt-4" width="200" @click="changePassword">Submit</v-btn>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from '/src/pinia'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const error = ref(false)
const errorMessage = ref('')

function changePassword() {
    axios.patch('auth/password', {
        token: route.query.t,
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
    }).then(() => {
        store.notification = {
            text: "Successfully updated password",
            color: "primary"
        }
        router.push('/login')
    }).catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
    })
}
</script>