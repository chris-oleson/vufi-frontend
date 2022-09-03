<template>
    <v-card class="pa-10 mx-auto mt-10" width="330">
        <v-card-title class="font-weight-light text-h5 justify-center">Settings</v-card-title>

        <!-- Theme Selection -->
        <v-card-actions class="justify-center my-6">
            <v-btn-toggle mandatory v-model="themeSelection">
                <v-btn small class="pa-4">System</v-btn>
                <v-btn small class="pa-4">Light</v-btn>
                <v-btn small class="pa-4">Dark</v-btn>
            </v-btn-toggle>
        </v-card-actions>

        <!-- Change Default Currency -->
        <v-card-actions class="mx-4">
            <v-select :items="currencies" v-model="currencySelection" dense outlined label="Default Currency"></v-select>
        </v-card-actions>

        <!-- Change Password -->
        <v-card-actions class="justify-center">
            <v-btn width="200" @click="redirect('/update-password')">Change Password</v-btn>
        </v-card-actions>

        <!-- Change Email -->
        <v-card-actions class="justify-center">
            <v-btn width="200" @click="redirect('/update-email')">Change Email</v-btn>
        </v-card-actions>

        <!-- Change Email -->
        <v-card-actions class="justify-center">
            <v-btn width="200" @click="redirect('/delete-account')">Delete Account</v-btn>
        </v-card-actions>
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

        async savePreferences() {
            await axios.put(`http://localhost:3000/api/user/${this.$store.state.userID}/update/preferences`, {
                theme: this.themeSelection,
                currency: this.currencySelection
            })
            .then(() => {
                // TODO: send success notification
                this.$store.commit('setUserPrefs', {
                    theme: this.themeSelection,
                    currency: this.currencySelection
                })
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