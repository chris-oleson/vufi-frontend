<template>
    <v-sheet class="text-center bg-accent" height="100%">
        <v-sheet class="px-5 py-12 mb-n16">
            <h1 class="font-weight-light pa-4">Pricing</h1>
            <div class="font-weight-light">Choose the plan that works best for you.</div>
            <div class="font-weight-light mb-16">Change your plan at any time!</div>
        </v-sheet>

        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" md="4" lg="3" class="ma-5">
                    <v-sheet elevation="4" width="330" class="py-16 mx-auto bg-secondary">
                        <h1 class="font-weight-light">$9.99<p class="font-weight-light text-subtitle-1 d-inline">/month</p></h1>
                        <p class="font-weight-light mt-4 mb-10">Cancel any time!</p>
                        <v-btn class="bg-primary" width="200" size="large" rounded="0" @click="redirect('month')">Start Free Trial</v-btn>
                    </v-sheet>
                </v-col>

                <v-col cols="12" md="4" lg="3" class="ma-5">
                    <v-sheet elevation="4" width="330" class="py-16 mx-auto bg-secondary">
                        <h1 class="font-weight-light">$99.99<p class="font-weight-light text-subtitle-1 d-inline">/year</p></h1>
                        <p class="font-weight-light mt-4 mb-10">Two months free!</p>
                        <v-btn class="bg-primary" width="200" size="large" rounded="0" @click="redirect('year')">Start Free Trial</v-btn>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
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
            else if (this.$store.state.isPaying) {
                this.$router.push('/assets')
            }
            else if (time == 'month') {
                window.location.href = 'https://buy.stripe.com/aEUaHo1gVaNh4mI144'
            }
            else if (time == 'year') {
                window.location.href = 'https://buy.stripe.com/5kA5n43p32gL06s145'
            }
        }
    }
}
</script>