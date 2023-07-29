<template>
    <v-container fluid class="text-center">
        <v-row class="pa-8">
            <v-col cols="12" lg="5" class="py-16 mt-10 mb-n16">
                <h1 class="text-h2 font-weight-light ">Finance at a Glance</h1>
                <h2 class="my-16 font-weight-light">One, simple, intuitive platform to organize and track your assets and debts</h2>
                <v-btn class="bg-primary" size="x-large" rounded="0" @click="redirect()">Start Free Trial</v-btn>
            </v-col>

            <v-col cols="12" lg="7">
                <v-card class="ma-5 mb-n16" elevation="10">
                    <v-img v-show="$vuetify.theme.name == 'dark'" transition="none" eager src="/landingPage4.png"/>
                    <v-img v-show="$vuetify.theme.name == 'light'" transition="none" eager src="/landingPage3.png"/>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="bg-accent py-16">
                <h2 class="font-weight-light text-h3 my-16">Unify Your Assets</h2>
                <h2 class="font-weight-light">No more logging into 10 different accounts to keep track of your money.</h2>
                <h2 class="font-weight-light mb-16">VuFi keeps all that data in one place, with one account.</h2>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="py-16">
                <h2 class="font-weight-light text-h3 my-16">Track Everything</h2>
                <h2 class="font-weight-light">Have more to worry about than bank accounts, credit cards, and investment accounts? No problem.</h2>
                <h2 class="font-weight-light mb-16">VuFi tracks the value of your real estate, vehicles, individual stocks, crypto currencies, foreign currencies, precious metals, art, and domains.</h2>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="bg-accent py-16">
                <h2 class="font-weight-light text-h3 my-16">Privacy and Security</h2>
                <h2 class="font-weight-light mb-16">All of your data is encrypted end to end, and will never be shared or sold.</h2>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'vufi-home',

    methods: {
        redirect() {
            if (!this.$store.state.isLoggedIn) {
                this.$router.push('/signup')
            }
            else if (this.$store.state.isPaying) {
                this.$router.push('/assets')
            }
            else {
                this.$router.push('/pricing')
            }
        }
    }
}
</script>