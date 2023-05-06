<template>
    <v-card class="ma-2 pa-2" elevation="4">
        <v-data-table :headers="headers" :items="tableData" :items-per-page="5">
            <template v-slot:top>
                <v-toolbar flat rounded color="transparent">

                    <!-- Top bar -->
                    <v-toolbar-title class="font-weight-light text-h5">{{ type }}s</v-toolbar-title>
                    <v-divider v-show="tableData.length" class="mx-4" inset vertical></v-divider>
                    <v-toolbar-title class="font-weight-light text-h5">{{ totalValue | toCurrency }}</v-toolbar-title>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="400px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn :color="getColor" fab small outlined v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
                        </template>

                        <!-- Add or edit asset dialog -->
                        <v-card>
                            <v-card-title>
                                <span class="text-h5 font-weight-light">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                                    <v-text-field v-model="editedItem.type" label="Type"></v-text-field>
                                    <v-text-field v-model="editedItem.value" label="Value"></v-text-field>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text @click="close">Cancel</v-btn>
                                <v-btn color="primary" text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- Delete asset dialog -->
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5 font-weight-light">Are you sure you want to delete this {{ type.toLowerCase() }}?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="error" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <!-- Format cost to currency -->
            <template v-slot:[`item.cost`]="{ item }">
                <span>{{ item.cost | toCurrency }}</span>
            </template>

            <!-- Format value to currency -->
            <template v-slot:[`item.value`]="{ item }">
                <span v-if="item.value">{{ parseFloat(item.value) | toCurrency }}</span>
            </template>

            <!-- Action buttons -->
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>

            <!-- No data display -->
            <template v-slot:no-data>
                <p class="my-4">No {{ type.toLowerCase() }}s have been added</p>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Table',
    props: ['type', 'url', 'tableData', 'totalValue'],
    components: {
        
    },

    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Type', value: 'type' },
            { text: 'Value', value: 'value', align: 'right' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'right' },
        ],
        editedIndex: -1,
        editedItem: {
            name: '',
            type: '',
            value: null,
        },
        defaultItem: {
            name: '',
            type: '',
            value: null,
        },
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New ' + this.type : 'Edit ' + this.type
        },

        getColor() {
            if (this.type == 'Asset') {
                return 'primary'
            }
            else {
                return 'error'
            }
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.tableData.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.tableData.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.deleteFromDatabase(this.editedItem)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
                // Editing existing
                Object.assign(this.tableData[this.editedIndex], this.editedItem)
                this.replaceInDatabase(this.editedItem)
            } else {
                // Adding new item
                this.addToDatabase(this.editedItem)
            }
            this.close()
        },

        async addToDatabase(item) {
            await axios.post(`http://localhost:3000/api/assets`, {
                name: item.name,
                type: item.type,
                value: item.value,
                is_debt: this.url == 'debts' ? 1 : 0
            })
            .then(() => {
                this.$store.dispatch('getAllAssetData')
            })
        },
        
        async replaceInDatabase(item) {
            await axios.put(`http://localhost:3000/api/assets/${item.id}`, {
                name: item.name,
                type: item.type,
                value: item.value,
                is_debt: this.url == 'debts' ? 1 : 0,
                user_id: this.$store.state.userID,
            })
            .then(() => {
                this.$store.dispatch('getAllAssetData')
            })
        },

        async deleteFromDatabase(item) {
            await axios.delete(`http://localhost:3000/api/assets/${item.id}`)
            .then(() => {
                this.$store.dispatch('getAllAssetData')
            })
        }
    },
}
</script>