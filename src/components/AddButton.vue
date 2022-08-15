<template>
    <v-card class="asset mb-2 pa-2 d-flex justify-center" width="100%">
        <v-btn @click="addAsset" class="my-2 d-inline primary" fab small>
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-card>
</template>

<script>
export default {
    name: 'AddButton',

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