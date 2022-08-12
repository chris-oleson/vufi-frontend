<template>
    <v-app>
        <v-app-bar app>
            <v-img src="./assets/icons8-stack-of-money-96.png" max-height="50" max-width="50" class="mr-2"></v-img>
            <h1 class="font-weight-light d-none d-sm-flex">NetWorth</h1>
            <v-spacer></v-spacer>
            <h1 class="font-weight-light">{{netWorth | toCurrency}}</h1>
        </v-app-bar>
        <v-main>
            <v-row class="ma-4">
                <v-col class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <AssetList/>
                </v-col>
                <v-col class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <HistoricData/>
                </v-col>
                <v-col class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <AssetDistribution/>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script>
import AssetList from './components/AssetList'
import HistoricData from './components/HistoricData.vue'
import AssetDistribution from './components/AssetDistribution.vue'

export default {
    name: 'App',

    components: {
        AssetList,
        HistoricData,
        AssetDistribution,
    },

    mounted() {
        // Check user prefs for dark mode
        this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },

    computed: {
        // Watch last entry in historic net worth totals
        netWorth() {
            if (this.$store.state.historicData.length) {
                return this.$store.state.historicData[this.$store.state.historicData.length - 1].y
            }
            else {
                return 0
            }
        },
    }
};
</script>

<style>
.v-btn:focus::before {
    opacity: 0 !important
}
</style>