<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>

        <v-text-field variant="underlined" class="my-4" label="Current Password" :error="incorrectPassword" type="password" v-model="password" @keyup.enter="deleteAccount"></v-text-field>
        <v-card-text v-if="incorrectPassword" class="text-error pa-0">Incorrect password</v-card-text>

        <v-btn rounded="0" class="bg-error mt-4" width="200" @click="deleteAccount">Delete Account</v-btn>
    </v-card>
</template>

<script setup>
    import axios from 'axios'
    import { useStore } from 'vuex'
    const store = useStore()
    import { useTheme } from 'vuetify'
    const theme = useTheme()
    import { useRouter } from 'vue-router'
    const router = useRouter()
    import { ref } from 'vue'

    let password = ref()
    let incorrectPassword = ref(false)

    async function deleteAccount () {
        // Update password in the database
        await axios.delete('user', {data: {password: password.value}})
        .then(() => {
            store.commit("setNotification", {
                text: "Successfully deleted account",
                color: "primary"
            })

            // Clear localStorage data
            store.commit('logOut')
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme.global.name.value = 'dark'
            }
            else {
                theme.global.name.value = 'light'
            }
            router.push('/')
        })
        .catch(() => {
            incorrectPassword.value = true
        })
    }
</script>