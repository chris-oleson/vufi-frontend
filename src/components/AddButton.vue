<template>
    <v-btn @click="addAsset" class="ma-4 d-inline" fab dark small color="light-green lighten-2">
        <v-icon>mdi-plus</v-icon>
    </v-btn>
</template>

<script>
import axios from 'axios'
export default {
    name: 'AddButton',

    methods: {
        async addAsset() {
            await axios.post('http://localhost:3000/assets',
                {
                    "assetName":null,
                    "value":null,
                    "editing":true
                }
            )
            this.$parent.loadData()
        }
    }
}
</script>