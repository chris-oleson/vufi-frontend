<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <v-img src="../assets/logo.svg" max-height="50" max-width="50" class="mx-auto"></v-img>

        <v-text-field class="my-4" label="Current Password" :error="incorrectPassword" type="password" v-model="password" @keyup.enter="deleteAccount"></v-text-field>
        <v-card-text v-if="incorrectPassword" class="error--text pa-0">Incorrect password</v-card-text>

        <v-btn tile class="error mt-4" width="200" @click="deleteAccount">Delete Account</v-btn>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UpdateEmail',

    data() {
        return {
            password: null,
            incorrectPassword: false,
        }
    },

    methods: {
        async deleteAccount () {
            // Update password in the database
            await axios.delete(process.env.VUE_APP_URL + 'user', {data: {password: this.password}})
            .then(() => {
                this.$store.commit("setNotification", {
                    text: "Successfully deleted account",
                    color: "primary"}
                )

                // Clear localStorage data
                this.$store.commit('logOut')
                this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
                this.$router.push('/')
            })
            .catch(() => {
                // Handles incorrect password
                this.incorrectPassword = true
            })
        }
    },
}
</script>