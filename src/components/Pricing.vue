<template>
    <v-container fluid class="text-center pa-0">
        <v-row class="ma-0">
            <v-col cols="12" lg="6" class="mx-auto my-16 pb-16">
                <h1 class="font-weight-light mb-8">Pricing</h1>
                <div class="font-weight-light">Choose the plan that works best for you.</div>
                <div class="font-weight-light">Change your plan at any time!</div>
            </v-col>
        </v-row>

        <v-row class="justify-center bg-accent ma-0">
            <v-col cols="12" md="4" lg="3" class="mx-4 mb-16 mt-n16">
                <v-card elevation="10" width="330" class="py-16 mx-auto bg-secondary">
                    <h1 class="font-weight-light">$9<p class="font-weight-light text-subtitle-1 d-inline">/month</p></h1>
                    <p class="font-weight-light mt-4 mb-10">Cancel any time!</p>
                    <v-btn class="bg-primary" width="200" size="large" rounded="0" @click="redirect('month')">Start Free Trial</v-btn>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" lg="3" class="mx-4 mb-16 mt-n16">
                <v-card elevation="10" width="330" class="py-16 mx-auto bg-secondary">
                    <h1 class="font-weight-light">$99<p class="font-weight-light text-subtitle-1 d-inline">/year</p></h1>
                    <p class="font-weight-light mt-4 mb-10">Two months free!</p>
                    <v-btn class="bg-primary" width="200" size="large" rounded="0" @click="redirect('year')">Start Free Trial</v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'vufi-pricing',

    methods: {
        redirect(time) {
            if (!this.$store.state.isLoggedIn) {
                this.$router.push('/signup')
            }
            else if (this.$store.state.isPaying) {
                this.$router.push('/assets')
            }
            else if (time == 'month') {
                window.location.href = import.meta.env.VITE_MONTHLY_PRODUCT
            }
            else if (time == 'year') {
                window.location.href = import.meta.env.VITE_YEARLY_PRODUCT
            }
        }
    }
}
</script>