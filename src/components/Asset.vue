<template>
    <v-card class="asset mb-2 pa-2 d-flex justify-space-between">

        <!-- Asset name -->
        <v-card-actions v-if="editing">
            <v-text-field label="Asset" dense v-model="editName"></v-text-field>
        </v-card-actions>
        <v-card-text v-else>{{data.assetName}}</v-card-text>
        
        <v-spacer></v-spacer>

        <!-- Asset value -->
        <v-card-actions v-if="editing">
            <v-text-field label="Value" dense v-model="editValue"></v-text-field>
        </v-card-actions>
        <v-card-text v-else class="text-right">{{data.value | toCurrency}}</v-card-text>

        <!-- Editing buttons -->
        <v-card-actions>
            <v-btn v-show="!editing" @click="editAsset" fab small depressed>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn v-show="editing" @click="saveAsset" fab small depressed color="primary">
                <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn v-show="editing" @click="deleteAsset" fab small depressed color="error">
                <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
        </v-card-actions>

        <v-snackbar v-model="showAlert" color="error" timeout="2000" min-width="100">Please fill out all fields</v-snackbar>
    </v-card>
</template>

<script>
export default {
    name: 'Asset',
    props: ['data'],

    data() {
        return {
            editing: this.data.editing,
            editName: null,
            editValue: null,
            showAlert: false
        }
    },

    methods: {
        editAsset() {
            // Assign props to writable variables
            this.editName = this.data.assetName
            this.editValue = this.data.value
            this.editing = true
        },

        async saveAsset() {
            if (this.editName && this.editValue) {
                this.editing = false

                await this.$store.dispatch('SAVE_ASSET', {
                    id: this.data.id,
                    data: {
                            "assetName": this.editName,
                            "value": parseFloat(this.editValue),
                            "editing": false,
                        }
                    }
                )
            }
            else {
                this.showAlert = true
            }
        },

        async deleteAsset() {
            await this.$store.dispatch('DELETE_ASSET', this.data.id)
            this.editing = this.data.editing
            this.editName = this.data.assetName
            this.editValue = this.data.value
        },
    },
}
</script>