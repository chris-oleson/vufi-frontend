<template>
    <v-card class="pa-10 mx-auto ma-10 text-center" width="330">
        <img src="/logo.svg" height="50" width="50" class="mx-auto"/>

        <!-- Theme Selection -->
        <v-card-text class="mt-4">Theme</v-card-text>
        <v-btn-toggle v-model="themeSelection" mandatory variant="tonal" density="compact" rounded="0" class="mb-4">
            <v-btn class="font-weight-light" size="small">System</v-btn>
            <v-btn class="font-weight-light" size="small">Light</v-btn>
            <v-btn class="font-weight-light" size="small">Dark</v-btn>
        </v-btn-toggle>

        <!-- Change Default Currency -->
        <v-card-text>Currency</v-card-text>
        <v-select :items="currencies" v-model="currencySelection" variant="outlined" density="compact" class="mx-6" rounded="0"></v-select>

        <v-card-text>Account</v-card-text>

        <!-- Change Password -->
        <v-btn rounded="0" variant="tonal" class="font-weight-light mb-4" width="200" to="/update-password">Change Password</v-btn>

        <!-- Change Email -->
        <v-btn rounded="0" variant="tonal" class="font-weight-light mb-4" width="200" to="/update-email">Change Email</v-btn>

        <!-- Unsubscribe -->
        <v-btn v-if="$store.state.subscriptionStatus = 'active'" rounded="0" variant="tonal" class="font-weight-light mb-4 text-error" width="200" to="/delete-account">Unsubscribe</v-btn>

        <!-- Delete Account -->
        <v-btn rounded="0" variant="tonal" class="font-weight-light text-error" width="200" to="/delete-account">Delete Account</v-btn>
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
            this.$axios.put('user/prefs', {
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