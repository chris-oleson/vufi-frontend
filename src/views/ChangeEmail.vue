<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
        <v-text-field variant="underlined" class="mt-4" label="Current Password" :error="error" type="password" v-model="password"></v-text-field>
        <v-text-field variant="underlined" class="my-4" label="New Email" v-model="newEmail" :error="error"></v-text-field>
        <v-text-field variant="underlined" class="mb-4" label="Confirm New Email" v-model="confirmNewEmail" :error="error" @keyup.enter="changeEmail"></v-text-field>
        <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
        <v-btn rounded="0" class="bg-primary mt-4" width="200" @click="changeEmail">Submit</v-btn>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()

const password = ref('')
const newEmail = ref('')
const confirmNewEmail = ref('')
const error = ref(false)
const errorMessage = ref('')

async function changeEmail () {
    // Update email in the database
    await axios.patch('user/email', {
        password: password.value,
        email: newEmail.value,
        confirmNewEmail: confirmNewEmail.value
    })
    .then(() => {
        store.commit("setNotification", {
            text: "Successfully updated email",
            color: "primary"}
        )
        router.push('/assets')
    })
    .catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
    })
}
</script>