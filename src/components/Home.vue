<template>
    <div>
        <!-- Above the fold -->
        <v-sheet>
            <v-sheet height="50"></v-sheet>
            <v-row class="text-center pa-5 mb-n16">
                <v-flex lg5>
                    <v-sheet height="100"></v-sheet>

                    <v-sheet class="ma-5">
                        <h1 class="text-h2 font-weight-light">Finance at a Glance</h1>
                        <h2 class="ma-12 font-weight-light">One, simple, intuitive interface that automatically tracks your assets and liabilities</h2>
                        <v-btn class="primary" x-large tile @click="redirect('/signup')">Sign up for a free trial</v-btn>
                    </v-sheet>
                </v-flex>

                <v-flex lg7>
                    <v-sheet class="ma-5" elevation="10">
                        <v-img v-if="$vuetify.theme.dark" eager src="../assets/landingPage4.png"></v-img>
                        <v-img v-else eager src="../assets/landingPage3.png"></v-img>
                    </v-sheet>
                </v-flex>
            </v-row>
        </v-sheet>

        <!-- Below the fold -->
        <v-sheet class="primary text-center">
            <v-sheet height="150" color="primary"></v-sheet>
            <v-sheet class="primary mx-auto px-5" max-width="900">
                <h3 class="font-weight-light text-h3 mb-16">Daily Automated Tracking</h3>
                <h4 class="font-weight-light text-h4 mb-10">No more logging into all your different accounts to manually track their performance.</h4>
            </v-sheet>
            <v-sheet height="100" color="primary"></v-sheet>
        </v-sheet>

        <v-sheet class="text-center">
            <v-sheet height="100"></v-sheet>
            <v-sheet class="mx-auto px-5" max-width="900">
                <h3 class="font-weight-light text-h3 mb-16">Track Everything</h3>
                <h4 class="font-weight-light text-h4 mb-10">Have more to worry about than bank accounts, credit cards, and investment accounts? No problem.</h4>
                <h4 class="font-weight-light text-h4">VuFi tracks the value of your real estate, vehicles, individual stocks, crypto currencies, foreign currencies, precious metals, art, and domains.</h4>
            </v-sheet>
            <v-sheet height="100"></v-sheet>
        </v-sheet>

        <v-sheet class="primary text-center">
            <v-sheet height="100" color="primary"></v-sheet>
            <v-sheet class="primary mx-auto px-5" max-width="900">
                <h3 class="font-weight-light text-h3 mb-16">Privacy and Security</h3>
                <h4 class="font-weight-light text-h4">You'll never see an Ad when using VuFi, and your data will never be sold.</h4>
            </v-sheet>
            <v-sheet height="100" color="primary"></v-sheet>
        </v-sheet>
    </div>
</template>

<script>
export default {
    name: 'Home',

    methods: {
        redirect(link) { this.$router.push(link) }
    }
}
</script>