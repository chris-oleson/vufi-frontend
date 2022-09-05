<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <v-img eager src="../assets/logo64x64.png" max-height="50" max-width="50" class="mx-auto"></v-img>

        <!-- Theme Selection -->
        <v-card-text class="mt-6">Theme</v-card-text>
        <v-card-actions class="justify-center mb-6">
            <v-btn-toggle mandatory v-model="themeSelection">
                <v-btn small class="pa-4">System</v-btn>
                <v-btn small class="pa-4">Light</v-btn>
                <v-btn small class="pa-4">Dark</v-btn>
            </v-btn-toggle>
        </v-card-actions>

        <!-- Change Default Currency -->
        <v-card-text>Display</v-card-text>
        <v-select :items="currencies" v-model="currencySelection" dense outlined label="Default Currency"></v-select>

        <v-card-text>Account</v-card-text>

        <!-- Change Password -->
        <v-btn width="200" @click="redirect('/update-password')">Change Password</v-btn>

        <!-- Change Email -->
        <v-btn width="200" class="my-4" @click="redirect('/update-email')">Change Email</v-btn>

        <!-- Delete Account -->
        <v-btn width="200" @click="redirect('/delete-account')">Delete Account</v-btn>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Settings',

    data() {
        return {
            themeSelection: this.$store.state.userPrefs.theme,

            currencySelection: this.$store.state.userPrefs.currency,
            currencies: [
                'USD'
            ],
        }
    },

    mounted() {
        if (!this.$store.state.userID) {
            this.$router.push('/404')
        }
    },

    methods: {
        redirect(link) { this.$router.push(link) },

        savePreferences() {
            axios.put(`http://localhost:3000/api/preferences/${this.$store.state.userID}`, {
                theme: this.themeSelection,
                currency: this.currencySelection
            })

            this.$store.commit('setUserPrefs', {
                theme: this.themeSelection,
                currency: this.currencySelection
            })
        },
    },

    watch: {
        themeSelection(data) {
            if (data == 0) {
                this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            }
            else if (data == 1) {
                this.$vuetify.theme.dark = false
            }
            else if (data == 2) {
                this.$vuetify.theme.dark = true
            }
            this.savePreferences()
        },

        currencySelection() {
            this.savePreferences()
        }
    }
}
</script>