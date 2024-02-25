<template>
    <v-card class="pa-10 mx-auto ma-10 text-center" width="330">
        <img src="/src/assets/logo.svg" height="50" width="50" alt="VuFi logo"/>

        <v-card-text class="mt-4">Theme</v-card-text>
        <v-btn-toggle v-model="selectedTheme" mandatory variant="tonal" density="compact" rounded="0" class="mb-4" @update:modelValue="savePreferences">
            <v-btn class="font-weight-light" size="small">System</v-btn>
            <v-btn class="font-weight-light" size="small">Light</v-btn>
            <v-btn class="font-weight-light" size="small">Dark</v-btn>
        </v-btn-toggle>

        <!-- <v-card-text>Currency</v-card-text>
        <v-select :items="currencies" v-model="selectedCurrency" variant="outlined" density="compact" class="mx-6" rounded="0" @update:modelValue="savePreferences"></v-select> -->

        <v-card-text>Account</v-card-text>
        <v-btn rounded="0" variant="tonal" class="font-weight-light mb-4" width="200" to="/change-password">Change Password</v-btn>
        <v-btn rounded="0" variant="tonal" class="font-weight-light mb-4" width="200" to="/change-email">Change Email</v-btn>
        <v-btn rounded="0" variant="tonal" class="font-weight-light mb-4 text-error" width="200" to="/delete-account">Delete Account</v-btn>

        <v-card-text>Subscription: {{ store.subscriptionStatus }}</v-card-text>
        <v-btn v-if="store.subscriptionStatus == 'Active'" rounded="0" variant="tonal" class="font-weight-light text-error mb-4" width="200" to="/cancel-subscription">Unsubscribe</v-btn>
        <v-btn v-else rounded="0" variant="tonal" class="font-weight-light text-primary mb-4" width="200" to="/pricing">Upgrade</v-btn>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from '/src/pinia'
const store = useStore()

const selectedTheme = ref(store.theme)
const selectedCurrency = ref(store.currency)
// const currencies = ref(['USD'])

function savePreferences() {
    store.theme = selectedTheme.value,
    store.currency = selectedCurrency.value

    axios.patch('/auth/prefs', {
        theme: selectedTheme.value,
        currency: selectedCurrency.value
    })
}
</script>