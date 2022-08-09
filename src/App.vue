<template>
    <v-app>
        <v-app-bar app>
            <v-img src="./assets/icons8-stack-of-money-96.png" max-height="50" max-width="50"></v-img>
            <h1 class="ml-2 font-weight-light">NetWorth</h1>
        </v-app-bar>
        <v-main>
            <v-row>
                <v-col cols="4">
                    <AssetList/>
                </v-col>
                <v-col cols="4">
                    <HistoricData/>
                </v-col>
                <v-col cols="4">
                    <ValueDistribution/>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script>
import AssetList from './components/AssetList'
import HistoricData from './components/HistoricData.vue'
import ValueDistribution from './components/ValueDistribution.vue'

export default {
    name: 'App',

    components: {
        AssetList,
        HistoricData,
        ValueDistribution,
    },

    data() {
        return {

        }
    },
};
</script>

<style>
.v-btn:focus::before {
    opacity: 0 !important;
}

.apexcharts-zoom-icon.apexcharts-selected svg {
    fill: #6E8192 !important
}
</style>