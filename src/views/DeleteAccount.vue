<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/src/assets/logo.svg" height="50" width="50" alt="VuFi logo"/>
        <v-card-text class="font-weight-light mt-4 pa-0">Deleting your account will also cancel any active subscriptions</v-card-text>
        <v-text-field :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" variant="underlined" label="Password" :type="showPassword ? 'text' : 'password'" v-model="password" :error="error" @click:append="showPassword = !showPassword" @keyup.enter="deleteAccount"/>
        <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
        <v-btn rounded="0" class="bg-error mt-4" width="200" @click="deleteAccount">Delete Account</v-btn>
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
const showPassword = ref(false)
const error = ref(false)
const errorMessage = ref('')

function deleteAccount () {
    axios.delete('/auth', { data: { password: password.value } }).then(() => {
        store.$reset()
        store.notification = {
            text: "Successfully deleted account",
            color: "primary"
        }
        router.push('/')
    }).catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
    })
}
</script>