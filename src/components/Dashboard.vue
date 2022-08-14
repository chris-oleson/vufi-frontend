<template>
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
</template>

<script>
import AssetList from '/src/components/AssetList'
import HistoricData from '/src/components/HistoricData.vue'
import AssetDistribution from '/src/components/AssetDistribution.vue'

export default ({
    name: 'Dashboard',

    components: {
        AssetList,
        HistoricData,
        AssetDistribution,
    },
})
</script>