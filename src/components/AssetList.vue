<template>
    <div class="ma-4">
        <h2 class="mb-4 font-weight-light text-center">Assets</h2>

        <Asset v-for="(data, i) in assetData" :key="i" :data="assetData[i]"/>

        <v-card class="asset mb-2 pa-2 d-flex justify-center">
            <v-btn @click="addAsset" class="my-2 d-inline primary" fab small>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-card>
    </div>
</template>

<script>
import Asset from '/src/components/Asset.vue'

export default {
    name: 'AssetList',
    components: {
        Asset
    },

    data() {
        return {
            showAlert: true,
        }
    },

    mounted() {
        this.$store.dispatch('LOAD_ASSETS')
    },

    computed: {
        assetData() { return this.$store.state.assetData }
    },

    methods: {
        async addAsset() {
            await this.$store.dispatch('ADD_ASSET',
                {
                    "assetName":null,
                    "value":null,
                    "editing":true
                }
            )
            await this.$store.dispatch('LOAD_ASSETS')
        }
    }
}
</script>