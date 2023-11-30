<template>
    <v-sheet class="bg-accent pa-0 text-center fill-height">
        <v-row class="bg-background pt-8 ma-0">
            <v-col cols="12" lg="5" class="py-16 px-5 mt-10 mb-n16">
                <h1 class="text-h2 font-weight-thin">Finance at a Glance</h1>
                <h2 class="my-16 font-weight-light">One, simple, intuitive platform to organize and track your assets and debts</h2>
                <v-btn class="bg-primary elevation-4" variant="text" disabled size="x-large" rounded="0" to="/signup">Start Free Trial</v-btn>
            </v-col>

            <v-col cols="12" lg="7">
                <v-card class="ma-5 mb-n16 elevation-10">
                    <v-img v-show="theme.global.name.value == 'dark'" transition="none" eager src="/src/assets/landingPage4.png" alt="VuFi interface"/>
                    <v-img v-show="theme.global.name.value == 'light'" transition="none" eager src="/src/assets/landingPage3.png" alt="VuFi interface"/>
                </v-card>
            </v-col>
        </v-row>

        <v-row class="py-16 ma-0">
            <v-col class="px-8 mx-auto" cols="12" lg="6">
                <h2 class="font-weight-thin text-h3 my-16">Unify Your Assets</h2>
                <h2 class="font-weight-light">No more logging into 10 different accounts to keep track of your money.</h2>
                <h2 class="font-weight-light mb-16">VuFi keeps all that data in one place, with one account.</h2>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()
</script>