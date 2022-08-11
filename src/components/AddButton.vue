<template>
    <v-btn @click="addAsset" class="ma-4 d-inline" fab dark small color="light-green lighten-2">
        <v-icon>mdi-plus</v-icon>
    </v-btn>
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