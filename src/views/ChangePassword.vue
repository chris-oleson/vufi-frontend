<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
        <v-text-field variant="underlined" class="mt-4" label="New Password" type="password" :error="error" v-model="newPassword"></v-text-field>
        <v-text-field variant="underlined" label="Confirm New Password" type="password" :error="error" v-model="confirmNewPassword" @keyup.enter="changePassword"></v-text-field>
        <v-card-text v-if="error" class="text-error pa-0 mt-4">{{ errorMessage }}</v-card-text>
        <v-btn rounded="0" class="bg-primary mt-4" width="200" @click="changePassword">Submit</v-btn>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

const newPassword = ref("")
const confirmNewPassword = ref("")
const error = ref(false)
const errorMessage = ref("")

async function changePassword() {
    await axios.patch('auth/change-password', {
        token: route.query.t,
        newPassword: newPassword.value,
        confirmNewPassword: confirmNewPassword.value
    }).then(() => {
        store.commit("setNotification", {
            text: "Successfully updated password",
            color: "primary"
        })
        // TODO: change this to an actual login request
        router.push('/login')
    }).catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
    })
}
</script>