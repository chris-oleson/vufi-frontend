<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/src/assets/logo.svg" height="50" width="50" alt="VuFi logo"/>
        <v-progress-circular v-if="loading" class="mt-4 mx-auto d-block" indeterminate></v-progress-circular>
        <template v-else-if="sentVerification">
            <v-card-text class="pa-0 mt-4 font-weight-light">We have sent you an email in order to verify your new email address.</v-card-text>
            <v-card-text class="pa-0 mt-4 font-weight-light">You must verify your new email before your account is updated.</v-card-text>
        </template>
        <template v-else>
            <v-text-field variant="underlined" label="New Email" v-model="newEmail" :error="error" class="mt-4"></v-text-field>
            <v-text-field :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" variant="underlined" label="Password" :type="showPassword ? 'text' : 'password'" v-model="password" :error="error" @click:append="showPassword = !showPassword" @keyup.enter="changeEmail"/>
            <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
            <v-btn rounded="0" class="bg-primary mt-4" width="200" @click="changeEmail">Submit</v-btn>
        </template>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const password = ref('')
const newEmail = ref('')
const showPassword = ref(false)
const error = ref(false)
const errorMessage = ref('')
const sentVerification = ref(false)
const loading = ref(false)

function changeEmail () {
    loading.value = true
    axios.patch('auth/email', {
        password: password.value,
        newEmail: newEmail.value,
    })
    .then(() => {
        sentVerification.value = true
        loading.value = false
    })
    .catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
        loading.value = false
    })
}
</script>