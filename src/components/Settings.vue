<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <img src="/public/logo.svg" height="50" width="50" class="mx-auto"/>

        <!-- Theme Selection -->
        <v-card-text class="mt-6">Theme</v-card-text>
        <v-btn-toggle v-model="themeSelection" mandatory variant="outlined" density="compact" class="mb-4">
            <v-btn class="font-weight-light" size="small">System</v-btn>
            <v-btn class="font-weight-light" size="small">Light</v-btn>
            <v-btn class="font-weight-light" size="small">Dark</v-btn>
        </v-btn-toggle>

        <!-- Change Default Currency -->
        <v-card-text>Currency</v-card-text>
        <v-select :items="currencies" v-model="currencySelection" variant="outlined" density="compact" class="mx-6"></v-select>

        <v-card-text>Account</v-card-text>

        <!-- Change Password -->
        <v-btn rounded="0" variant="outlined" class="font-weight-light" width="200" @click="$router.push('/update-password')">Change Password</v-btn>

        <!-- Change Email -->
        <v-btn rounded="0" variant="outlined" class="font-weight-light my-4" width="200" @click="$router.push('/update-email')">Change Email</v-btn>

        <!-- Delete Account -->
        <v-btn rounded="0" variant="outlined" class="font-weight-light text-error" width="200" @click="$router.push('/delete-account')">Delete Account</v-btn>
    </v-card>
</template>

<script>
export default {
    name: 'vufi-settings',

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
            this.$router.push('/login')
        }
    },

    methods: {
        savePreferences() {
            // Update database preferences
            this.$axios.put('preferences', {
                theme: this.themeSelection,
                currency: this.currencySelection
            })
            .catch((err) => {
                console.log(err.message)
            })

            // Set client side data
            this.$store.commit('setUserPrefs', {
                theme: this.themeSelection,
                currency: this.currencySelection
            })
        }
    },

    watch: {
        themeSelection() {
            this.savePreferences()
        },

        currencySelection() {
            this.savePreferences()
        }
    }
}
</script>