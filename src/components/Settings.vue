<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <v-img src="../assets/logo.svg" max-height="50" max-width="50" class="mx-auto"></v-img>

        <!-- Theme Selection -->
        <v-card-text class="mt-6">Theme</v-card-text>
        <v-card-actions class="justify-center mb-6">
            <v-btn-toggle tile mandatory v-model="themeSelection">
                <v-btn small text outlined class="font-weight-light pa-4">System</v-btn>
                <v-btn small text outlined class="font-weight-light pa-4">Light</v-btn>
                <v-btn small text outlined class="font-weight-light pa-4">Dark</v-btn>
            </v-btn-toggle>
        </v-card-actions>

        <!-- Change Default Currency -->
        <v-card-text>Display</v-card-text>
        <v-select :items="currencies" :menu-props="{ tile: true, nudgeBottom: 40 }" v-model="currencySelection" dense outlined class="rounded-0 mx-auto" label="Default Currency"></v-select>

        <v-card-text>Account</v-card-text>

        <!-- Change Password -->
        <v-btn outlined tile text class="font-weight-light" width="200" @click="redirect('/update-password')">Change Password</v-btn>

        <!-- Change Email -->
        <v-btn outlined tile text class="font-weight-light my-4" width="200" @click="redirect('/update-email')">Change Email</v-btn>

        <!-- Delete Account -->
        <v-btn outlined tile text class="font-weight-light error--text" width="200" @click="redirect('/delete-account')">Delete Account</v-btn>
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
                'USD',
            ],
        }
    },

    mounted() {
        if (!this.$store.state.isLoggedIn) {
            this.redirect('/login')
        }
    },

    methods: {
        savePreferences() {
            axios.put(process.env.VUE_APP_URL + 'preferences', {
                theme: this.themeSelection,
                currency: this.currencySelection
            })
            .catch((err) => {
                console.log(err.message)
            })

            this.$store.commit('setUserPrefs', {
                theme: this.themeSelection,
                currency: this.currencySelection
            })
        },

        redirect(link) {
            if (this.$route.path != link) {
                this.$router.push(link)
            }
        }
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

<style scoped>
.v-input{
    width: 200px;
}
</style>