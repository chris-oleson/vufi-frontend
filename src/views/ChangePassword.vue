<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
        <v-text-field variant="underlined" class="mt-4" label="New Password" type="password" v-model="newPassword"></v-text-field>
        <v-text-field variant="underlined" label="Confirm New Password" type="password" v-model="confirmNewPassword" @keyup.enter="changePassword"></v-text-field>
        <v-card-text v-if="error" class="text-error pa-0 mt-4">Passwords do not match</v-card-text>
        <v-btn rounded="0" class="bg-primary mt-4" width="200" @click="changePassword">Submit</v-btn>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()

const newPassword = ref("")
const confirmNewPassword = ref("")
const error = ref(false)

async function changePassword() {
    // Update password in the database
    await axios.patch('auth/change-password', {
        newPassword: newPassword.value,
        confirmNewPassword: confirmNewPassword.value
    })
    .then(() => {
        store.commit("setNotification", {
            text: "Successfully updated password",
            color: "primary"}
        )
        router.push('/assets')
    })
    .catch((err) => {
        console.log(err.message)
        // Handles incorrect current password
        error.value = true
    })
}
</script>