<template>
    <v-sheet>
        <!-- Above the fold -->
        <v-sheet height="50"></v-sheet>
        <v-container fluid class="text-center">
            <v-row class="ma-5">
                <v-flex xs12 lg5>
                    <v-sheet height="50"></v-sheet>
                    <v-sheet class="ma-5">
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
            <v-sheet height="150" color="primary"></v-sheet>
            <v-sheet class="primary mx-auto px-5" max-width="900">
                <h3 class="font-weight-light text-h3 mb-16">Post-Budget Planning</h3>
                <h4 class="font-weight-light text-h4 mb-10">Finally making more money than you spend? Keep an eye on your growing savings and investments with VuFi</h4>
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
                <h4 class="font-weight-light text-h4">You'll never see an ad when using VuFi, and your data will never be sold.</h4>
            </v-sheet>
            <v-sheet height="100" color="primary"></v-sheet>
        </v-sheet>
    </v-sheet>
</template>

<script>
export default {
    name: 'Home',
}
</script>