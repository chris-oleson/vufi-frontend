<template>
    <v-sheet class="bg-accent text-center fill-height">
        <v-row class="ma-0 bg-background">
            <v-col cols="12" lg="6" class="mx-auto py-16">
                <h1 class="font-weight-light mb-8">Pricing</h1>
                <div class="font-weight-light">Choose the plan that works best for you.</div>
                <div class="font-weight-light pb-10">Change your plan at any time!</div>
            </v-col>
        </v-row>

        <v-row class="justify-center ma-0">
            <v-col cols="12" md="4" lg="3" class="mx-4 mb-16 mt-n16">
                <v-card elevation="10" width="330" class="py-16 mx-auto bg-secondary">
                    <h1 class="font-weight-light">$9<p class="font-weight-light text-subtitle-1 d-inline">/month</p></h1>
                    <p class="font-weight-light mt-4 mb-10">Cancel any time!</p>
                    <v-btn class="bg-primary elevation-4" width="200" size="large" variant="text" disabled rounded="0" @click="redirect('month')">Start Free Trial</v-btn>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" lg="3" class="mx-4 mb-16 mt-n16">
                <v-card elevation="10" width="330" class="py-16 mx-auto bg-secondary">
                    <h1 class="font-weight-light">$99<p class="font-weight-light text-subtitle-1 d-inline">/year</p></h1>
                    <p class="font-weight-light mt-4 mb-10">Two months free!</p>
                    <v-btn class="bg-primary elevation-4" width="200" size="large" variant="text" disabled rounded="0" @click="redirect('year')">Start Free Trial</v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
export default {
    name: 'vufi-pricing',

    methods: {
        redirect(time) {
            if (!this.$store.state.isLoggedIn) {
                this.$router.push('/signup')
            }
            else if (this.$store.state.subscriptionStatus == "active") {
                this.$router.push('/assets')
            }
            else if (time == 'month') {
                window.location.href = "https://buy.stripe.com/test_8wM3gi3Nr3DN9oI6or"
            }
            else if (time == 'year') {
                window.location.href = "https://buy.stripe.com/test_00g9EGgAd4HRcAUbIM"
            }
        }
    }
}
</script>