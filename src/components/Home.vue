<template>
    <v-sheet>
        <!-- Above the fold -->
        <v-container fluid class="text-center">
            <v-row class="ma-5">
                <v-flex xs12 lg5>
                    <v-sheet class="ma-5 pt-16">
                        <h1 class="text-h2 font-weight-light">Finance at a Glance</h1>
                        <h2 class="my-16 font-weight-light">One, simple, intuitive platform to organize and track your assets and debts</h2>
                        <v-btn class="primary" x-large tile @click="this.$router.push('/signup')">Start Free Trial</v-btn>
                    </v-sheet>
                </v-flex>

                <v-flex xs12 lg7>
                    <v-sheet class="ma-5 mb-n16" elevation="10">
                        <v-img v-if="$vuetify.theme.dark" eager src="../assets/landingPage4.png"></v-img>
                        <v-img v-else eager src="../assets/landingPage3.png"></v-img>
                    </v-sheet>
                </v-flex>
            </v-row>
        </v-container>

        <!-- Below the fold -->
        <v-sheet class="primary text-center">
            <v-sheet class="primary mx-auto px-5 py-16" max-width="900">
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

        <v-sheet class="primary text-center">
            <v-sheet class="primary mx-auto px-5 py-16" max-width="900">
                <h2 class="font-weight-light text-h3 mb-16">Privacy and Security</h2>
                <h2 class="font-weight-light">All of your data is encrypted on our database, so even if we were hacked, your personal info is safe.</h2>
            </v-sheet>
        </v-sheet>
    </v-sheet>
</template>

<script>
export default {
    name: 'Home',
}
</script>