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
                        <v-btn class="primary normal" x-large elevation="10" @click="redirect('/signup')">Get Started for Free!</v-btn>
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
                <h4 class="font-weight-light text-h4 mb-10">Stop logging into all of your financial accounts, checking their balances, adding them up, and recording that data in a spreadsheet just to keep track of your money.</h4>
                <h4 class="font-weight-light text-h4">VuFi does that for you.</h4>
            </v-sheet>
            <v-sheet height="100" color="primary"></v-sheet>
        </v-sheet>

        <v-sheet class="text-center">
            <v-sheet height="100"></v-sheet>
            <v-sheet class="mx-auto px-5" max-width="900">
                <h3 class="font-weight-light text-h3 mb-16">Track Everything</h3>
                <h4 class="font-weight-light text-h4 mb-10">Have more to worry about than bank accounts, credit cards, and brokerage accounts? No problem!</h4>
                <h4 class="font-weight-light text-h4">VuFi tracks the value of your real estate, vehicles, individual stocks, crypto currencies, foreign currencies, precious metals, art, and domains.</h4>
            </v-sheet>
            <v-sheet height="100"></v-sheet>
        </v-sheet>

        <v-sheet class="primary text-center">
            <v-sheet height="100" color="primary"></v-sheet>
            <v-sheet class="primary mx-auto px-5" max-width="900">
                <h3 class="font-weight-light text-h3 mb-16">Manual Tracking</h3>
                <h4 class="font-weight-light text-h4">If you own a very niche asset that VuFi isn't able to track, you can add custom assets with manually updated values.</h4>
            </v-sheet>
            <v-sheet height="100" color="primary"></v-sheet>
        </v-sheet>

        <v-sheet class="text-center">
            <v-sheet height="100"></v-sheet>
            <v-sheet class="mx-auto px-5" max-width="900">
                <h3 class="font-weight-light text-h3 mb-16">No Ads. Ever.</h3>
                <h4 class="font-weight-light text-h4">Whether you are paying for VuFi or not; you'll never see an ad when using the app.</h4>
            </v-sheet>
            <v-sheet height="100"></v-sheet>
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