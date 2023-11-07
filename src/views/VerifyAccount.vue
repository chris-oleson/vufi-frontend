<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>
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

if (!route.query.t) {
    router.push('/404')
}

async function verifyAccount() {
    await axios.patch('auth/verify-account', {
        token: route.query.t,
        email: route.query.e,
    }).then(() => {
        store.commit("setNotification", {
            text: "Successfully verified account!",
            color: "primary"
        })
        router.push('/login')
    }).catch((err) => {
        error.value = true
        errorMessage.value = err.response.data
    })
}
</script>