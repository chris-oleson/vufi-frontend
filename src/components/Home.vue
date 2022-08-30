<template>
    <div>
        <v-sheet>
            <v-row class="text-center pa-6">
                <v-flex lg5>
                    <v-sheet height="100"></v-sheet>

                    <v-sheet class="ma-6">
                        <h1 class="text-h2 font-weight-light">Assets at a Glance</h1>
                        <h2 class="my-12 font-weight-light">One, simple, intuitive interface that automatically tracks your assets and liabilities</h2>
                        <v-btn class="primary normal" x-large elevation="10" @click="redirect('/signup')">Get Started for Free!</v-btn>
                    </v-sheet>

                    <v-sheet height="100"></v-sheet>
                </v-flex>

                <v-flex lg7>
                    <v-sheet class="ma-6" elevation="10">
                        <v-img v-if="this.$vuetify.theme.dark" src="../assets/landingPage4.png"></v-img>
                        <v-img v-else src="../assets/landingPage3.png"></v-img>
                    </v-sheet>
                </v-flex>
            </v-row>
        </v-sheet>

        <v-sheet height="400px" color="primary">

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