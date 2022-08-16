<template>
    <v-row class="ma-4">
        <v-flex xs12 sm12 md6 lg4>
            <AssetList/>
        </v-flex>
        <v-flex xs12 sm12 md6 lg4>
            <HistoricData/>
        </v-flex>
        <v-flex xs12 sm12 md6 lg4>
            <AssetDistribution/>
        </v-flex>
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

    mounted() {
        if (!this.$store.state.currentUser.email) {
            this.$router.push('/404')
        }
    },

    computed: {
        currentUser() { return this.$store.state.currentUser }
    }
})
</script>