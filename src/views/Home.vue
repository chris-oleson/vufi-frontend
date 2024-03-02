<template>
    <v-container fluid class="text-center pa-3" style="height: 100%">
        <v-row class="pt-8">
            <v-col cols="12" lg="5" class="py-16 px-5 mt-10 mb-n16">
                <h1 class="text-h2 font-weight-thin">Finance at a Glance</h1>
                <h2 class="my-16 font-weight-light">One, simple, intuitive platform to organize and track your assets and debts</h2>
                <v-btn class="bg-primary elevation-4" variant="text" size="x-large" rounded="0" to="/signup">Get started for free</v-btn>
            </v-col>

            <v-col cols="12" lg="7">
                <v-card class="ma-5 mb-n16 elevation-10">
                    <img v-if="theme.global.name.value == 'dark'" class="d-block" style="max-width: 100%;" src="/src/assets/landingPage4.png" alt="VuFi interface"/>
                    <img v-else class="d-block" style="max-width: 100%;" src="/src/assets/landingPage3.png" alt="VuFi interface"/>
                </v-card>
            </v-col>
        </v-row>

        <v-row class="bg-accent py-16">
            <v-col class="px-8 mx-auto" cols="12" lg="6">
                <h2 class="font-weight-thin text-h3 my-16">Unify Your Assets</h2>
                <h2 class="font-weight-light mb-16">
                    No more logging into ten different accounts to keep track of your money. VuFi keeps all that data in one place, with one account.
                </h2>
            </v-col>
        </v-row>

        <v-row class="py-16">
            <v-col class="px-8 mx-auto" cols="12" lg="6">
                <h2 class="font-weight-thin text-h3 my-16">Automated Organization</h2>
                <h2 class="font-weight-light mb-16">
                    VuFi automatically tracks your net worth for you. Values are updated every day; not every month on an excel spreadsheet.
                </h2>
            </v-col>
        </v-row>

        <v-row class="bg-accent py-16">
            <v-col class="px-8 mx-auto" cols="12" lg="6">
                <h2 class="font-weight-thin text-h3 my-16">Private and Secure</h2>
                <h2 class="font-weight-light mb-16">
                    VuFi doesn't store any of your financial credentials; they are passed directly to our third party financial services.
                    We'll never share or sell your data, and you'll never see a single ad.
                </h2>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()
</script>