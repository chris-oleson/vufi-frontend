<template>
    <v-card class="pa-10 mx-auto mt-10" width="330">
        <v-img eager src="../assets/logo64x64.png" max-height="50" max-width="50" class="mx-auto"></v-img>

        <v-text-field class="mt-6" label="Current Password" :error="incorrectPassword" type="password" v-model="password"></v-text-field>
        <v-card-text v-if="incorrectPassword" class="error--text pa-0">Incorrect password</v-card-text>

        <v-card-actions class="justify-center mt-6">
            <v-btn color="error" width="200" @click="deleteAccount">Delete Account</v-btn>
        </v-card-actions>
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
            await axios.delete(`http://localhost:3000/api/user/${this.$store.state.userID}?password=${this.password}`)
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