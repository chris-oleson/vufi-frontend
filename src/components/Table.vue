<template>
    <v-data-table :headers="headers" :items="assets" :items-per-page="-1" sort-by="value" sort-desc class="elevation-2 ma-2 pa-4">
        <template v-slot:top>
            <v-toolbar flat rounded color="transparent">

                <!-- Top bar -->
                <v-toolbar-title class="font-weight-light text-h5">Total Value</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-toolbar-title class="font-weight-light text-h5">$50,000.00</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="400px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn :color="theme" class="pa-2" v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon>Add {{ title }}</v-btn>
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
                        <v-card-title class="text-h5 font-weight-light">Are you sure you want to delete this {{ title }}?</v-card-title>
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
            <span>{{ item.value | toCurrency }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>

        <!-- TODO: update this no-data display -->
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
export default {
    name: 'Table',
    props: ['title', 'theme'],

    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Type', value: 'type' },
            { text: 'Value', value: 'value', align: 'right' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'right' },
        ],
        assets: [],
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
            return this.editedIndex === -1 ? 'New ' + this.title : 'Edit ' + this.title
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },

    created () {
        this.initialize()
    },

    methods: {
        initialize () {
            this.assets = [
                {
                    name: 'USAA Checking',
                    type: 'Bank Account',
                    value: 5000
                },
                {
                    name: 'Guideline 401k',
                    type: 'Investment Account',
                    value: 20000
                },
                {
                    name: 'Fidelity Roth IRA',
                    type: 'Investment Account',
                    value: 9000
                },
                {
                    name: '2020 Ford Mustang',
                    type: 'Vehicle',
                    value: 25000
                },
            ]
        },

        editItem (item) {
            this.editedIndex = this.assets.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.assets.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.assets.splice(this.editedIndex, 1)
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
                Object.assign(this.assets[this.editedIndex], this.editedItem)
            } else {
                this.assets.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>