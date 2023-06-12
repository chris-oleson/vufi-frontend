<template>
    <v-card class="pa-2 font" elevation="4">
        <v-data-table :items-per-page="5" :headers="headers" :items="tableData" item-value="name">
            <template v-slot:top>
                <v-toolbar flat rounded color="transparent">

                    <!-- Top bar -->
                    <div class="font-weight-light text-h5 mx-4">{{ type }}s</div>
                    <v-divider inset vertical></v-divider>
                    <div class="font-weight-light text-h5 mx-4">{{ totalValue }}</div>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="400px">
                        <template v-slot:activator="{ props }">
                            <v-btn :color="color" size="small" variant="outlined" icon="mdi-plus" v-bind="props"/>
                        </template>

                        <!-- Add or edit asset dialog -->
                        <v-card>
                            <v-card-title>
                                <span class="text-h5 font-weight-light">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-text-field v-model="editedItem.name" variant="underlined" label="Name"></v-text-field>
                                    <v-text-field v-model="editedItem.type" variant="underlined" label="Type"></v-text-field>
                                    <v-text-field v-model="editedItem.value" variant="underlined" label="Value"></v-text-field>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn rounded="0" text @click="close">Cancel</v-btn>
                                <v-btn rounded="0" color="primary" @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- Delete asset dialog -->
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5 font-weight-light">Are you sure you want to delete this {{ type.toLowerCase() }}?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn rounded="0" text @click="closeDelete">Cancel</v-btn>
                                <v-btn rounded="0" text color="error" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" class="mr-2" @click="editItem(item.raw)">mdi-pencil</v-icon>
                <v-icon size="small" @click="deleteItem(item.raw)">mdi-delete</v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    name: 'Table',
    props: ['color', 'type', 'url', 'tableData', 'totalValue'],

    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                { title: 'Name', align: 'start', key: 'name' },
                { title: 'Type', align: 'start', key: 'type' },
                { title: 'Value', align: 'end', key: 'value' },
                { title: 'Actions', align: 'end', key: 'actions', sortable: false },
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
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New ' + this.type : 'Edit ' + this.type
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
            await this.$axios.post('assets', {
                name: item.name,
                type: item.type,
                value: this.url == 'assets' ? Math.abs(item.value) : 0 - Math.abs(item.value),
            })
            .then(() => {
                this.$store.dispatch('getAllAssetData')
            })
        },
        
        async replaceInDatabase(item) {
            await this.$axios.put('assets/' + item.id, {
                name: item.name,
                type: item.type,
                value: this.url == 'assets' ? Math.abs(item.value) : 0 - Math.abs(item.value),
                user_id: this.$store.state.userID,
            })
            .then(() => {
                this.$store.dispatch('getAllAssetData')
            })
        },

        async deleteFromDatabase(item) {
            await this.$axios.delete('assets/' + item.id)
            .then(() => {
                this.$store.dispatch('getAllAssetData')
            })
        }
    }
}
</script>