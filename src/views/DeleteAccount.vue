<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
        <v-card-text class="font-weight-light mt-4 pa-0">Deleting your account will also cancel any active subscriptions</v-card-text>
        <v-text-field variant="underlined" class="my-4" label="Current Password" :error="error" type="password" v-model="password" @keyup.enter="deleteAccount"></v-text-field>
        <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
        <v-btn rounded="0" class="bg-error mt-4" width="200" @click="deleteAccount">Delete Account</v-btn>
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
const error = ref(false)
const errorMessage = ref('')

function deleteAccount () {
    axios.delete('user', {data: {password: password.value}})
    .then(() => {
        store.commit("setNotification", {
            text: "Successfully deleted account",
            color: "primary"
        })
        store.commit('logOut')
        router.push('/')
    })
    .catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
    })
}
</script>