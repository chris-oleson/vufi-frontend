<template>
        <v-card class="asset my-2 d-flex justify-space-between">
            <v-card-actions v-if="editing">
                <v-text-field label="Asset" dense v-model="editName"></v-text-field>
            </v-card-actions>
            <v-card-text v-else class="d-inline">{{assetData.assetName}}</v-card-text>

            <v-card-actions v-if="editing">
                <v-text-field label="Value" dense v-model="editValue"></v-text-field>
            </v-card-actions>
            <v-card-text v-else class="d-inline text-right">{{assetData.value | toCurrency}}</v-card-text>

            <v-card-actions>
                <v-btn v-show="!editing" @click="editAsset" fab small depressed>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn v-show="editing" @click="saveAsset" fab small depressed color="light-green lighten-2">
                    <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn v-show="editing" @click="deleteAsset" fab small depressed color="red lighten-2">
                    <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Asset',
    props: ['assetData'],

    data() {
        return {
            editing: this.assetData.editing,
            editName: null,
            editValue: null,
        }
    },

    mounted() {

    },

    methods: {
        editAsset() {
            // Assign props to writable variables
            this.editName = this.assetData.assetName
            this.editValue = this.assetData.value
            this.editing = true
        },

        async saveAsset() {
            if (this.editName && this.editValue) {
                this.editing = false

                if (this.editName != this.assetData.assetName || this.editValue != this.assetData.value) {
                    await axios.patch('http://localhost:3000/assets/' + this.assetData.id,
                        {
                            "assetName": this.editName,
                            "value": parseFloat(this.editValue),
                            "editing": false,
                        }
                    )

                    await this.$parent.getAssetData()
                    await this.$parent.updateChartData()
                }
            }
            else {
                this.$parent.showAlert = true
            }
            
        },

        async deleteAsset() {
            await axios.delete('http://localhost:3000/assets/' + this.assetData.id)
            await this.$parent.getAssetData()
            await this.$parent.updateChartData()
        },
    },

    watch: { 
        assetData: function(newData) {
            this.editName = newData.assetName
            this.editValue = newData.value
            this.editing = newData.editing
        }
    }
}
</script>