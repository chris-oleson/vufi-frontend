<template>
    <v-container fluid class="bg-accent text-center pa-3" style="height: 100%">
        <v-row class="bg-background">
            <v-col cols="12" lg="6" class="mx-auto py-16">
                <h1 class="font-weight-light mb-8">Pricing</h1>
                <div class="font-weight-light">Choose the plan that works best for you.</div>
                <div class="font-weight-light pb-10">Change your plan at any time!</div>
            </v-col>
        </v-row>

        <v-row class="justify-center">
            <v-col cols="12" md="4" lg="3" class="mx-4 mb-16 mt-n16">
                <v-card elevation="10" width="330" class="pa-16 mx-auto bg-secondary">
                    <h1 class="font-weight-light">Free</h1>
                    <p class="font-weight-light mt-4">Manual tracking only</p>
                    <v-btn class="bg-primary elevation-4 mt-10" width="200" size="large" variant="text" rounded="0" to="/signup">Get Started</v-btn>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" lg="3" class="mx-4 mb-16 mt-n16">
                <v-card elevation="10" width="330" class="pa-16 mx-auto bg-secondary">
                    <h1 class="font-weight-light">$9<p class="font-weight-light text-subtitle-1 d-inline">/month</p></h1>
                    <p class="font-weight-light mt-4">Cancel any time!</p>
                    <v-btn class="bg-primary elevation-4 mt-10" width="200" size="large" variant="text" rounded="0" @click="redirect('month')">Get Started</v-btn>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" lg="3" class="mx-4 mb-16 mt-n16">
                <v-card elevation="10" width="330" class="pa-16 mx-auto bg-secondary">
                    <h1 class="font-weight-light">$90<p class="font-weight-light text-subtitle-1 d-inline">/year</p></h1>
                    <p class="font-weight-light mt-4">Two months free!</p>
                    <v-btn class="bg-primary elevation-4 mt-10" width="200" size="large" variant="text" rounded="0" @click="redirect('year')">Get Started</v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useStore } from '/src/pinia'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()

function redirect(time) {
    if (!store.isLoggedIn) {
        router.push('/signup')
    }
    else if (store.subscriptionStatus == "Active") {
        router.push('/assets')
    }
    else if (time == 'month') {
        window.location.href = "https://buy.stripe.com/5kAdTAcZD6x15qM7su"
    }
    else if (time == 'year') {
        window.location.href = "https://buy.stripe.com/5kA5n43p32gL06s145"
    }
}
</script>