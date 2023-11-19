<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
        <v-text-field variant="underlined" class="mt-4" label="Current Password" :error="error" type="password" v-model="password"></v-text-field>
        <v-text-field variant="underlined" label="New Email" v-model="email" :error="error"></v-text-field>
        <v-text-field variant="underlined" label="Confirm New Email" v-model="confirmEmail" :error="error" @keyup.enter="changeEmail"></v-text-field>
        <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
        <v-btn rounded="0" class="bg-primary mt-4" width="200" @click="changeEmail">Submit</v-btn>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from '/src/pinia'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()

const password = ref('')
const email = ref('')
const confirmEmail = ref('')
const error = ref(false)
const errorMessage = ref('')

function changeEmail () {
    axios.patch('user/email', {
        password: password.value,
        email: email.value,
        confirmEmail: confirmEmail.value
    })
    .then(() => {
        store.notification = {
            text: "Successfully updated email",
            color: "primary"
        }
        router.push('/assets')
    })
    .catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
    })
}
</script>