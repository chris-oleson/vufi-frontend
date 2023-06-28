<template>
    <v-sheet>
        <!-- Above the fold -->
        <v-container fluid class="text-center">
            <v-row class="ma-5">
                <v-col cols="12" lg="5">
                    <v-sheet class="ma-5 pt-16">
                        <h1 class="text-h2 font-weight-light">Finance at a Glance</h1>
                        <h2 class="my-16 font-weight-light">One, simple, intuitive platform to organize and track your assets and debts</h2>
                        <v-btn class="bg-primary" size="x-large" rounded="0" @click="redirect()">Start Free Trial</v-btn>
                    </v-sheet>
                </v-col>

                <v-col cols="12" lg="7">
                    <v-sheet class="ma-5 mb-n16" elevation="10">
                        <v-img v-if="$vuetify.theme.name == 'dark'" eager src="../assets/landingPage4.png"/>
                        <v-img v-else eager src="../assets/landingPage3.png"/>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>

        <!-- Below the fold -->
        <v-sheet class="bg-accent text-center">
            <v-sheet class="bg-accent mx-auto px-5 py-16" max-width="900">
                <h2 class="font-weight-light text-h3 mb-16 pt-12">Unify Your Assets</h2>
                <h2 class="font-weight-light">No more logging into 10 different accounts to keep track of your money.</h2>
                <h2 class="font-weight-light">VuFi keeps all that data in one place, with one account.</h2>
            </v-sheet>
        </v-sheet>

        <v-sheet class="text-center">
            <v-sheet class="mx-auto px-5 py-16" max-width="900">
                <h2 class="font-weight-light text-h3">Track Everything</h2>
                <h2 class="font-weight-light my-16">Have more to worry about than bank accounts, credit cards, and investment accounts? No problem.</h2>
                <h2 class="font-weight-light">VuFi tracks the value of your real estate, vehicles, individual stocks, crypto currencies, foreign currencies, precious metals, art, and domains.</h2>
            </v-sheet>
        </v-sheet>

        <v-sheet class="bg-accent text-center">
            <v-sheet class="bg-accent mx-auto px-5 py-16" max-width="900">
                <h2 class="font-weight-light text-h3 mb-16">Privacy and Security</h2>
                <h2 class="font-weight-light">All of your data is encrypted on our database, so your personal data is always safe.</h2>
            </v-sheet>
        </v-sheet>
    </v-sheet>
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