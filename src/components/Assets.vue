<template>
    <v-row class="ma-2">
        <v-flex xs12 sm6 md6 lg6>
            <AssetList/>
        </v-flex>
        <v-flex xs12 sm6 md6 lg6>
            <AssetDistribution/>
        </v-flex>
    </v-row>
</template>

<script>
import AssetList from '/src/components/AssetList.vue'
import AssetDistribution from '/src/components/AssetDistribution.vue'

export default ({
    name: 'Assets',

    components: {
        AssetList,
        AssetDistribution,
    },

    mounted() {
        if (!this.$store.state.currentUser.email) {
            this.$router.push('/404')
        }
        
        this.$store.commit('setAssets', [])
        this.$store.dispatch('LOAD_ASSETS')
    },
})
</script>