<template>
    <v-card class="pa-2 font" elevation="4">
        <v-data-table :headers="headers" :items="props.tableData" item-value="name">
            <template v-slot:top>
                <v-toolbar flat rounded color="transparent">
                    <div class="font-weight-light text-h5 mx-4">{{ props.type }}s</div>
                    <v-divider inset vertical></v-divider>
                    <div class="font-weight-light text-h5 mx-4" :class="{blur: store.privacy}">{{ formatCurrency(props.totalValue) }}</div>

                    <v-spacer></v-spacer>

                    <v-menu offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
                        <template v-slot:activator="{ props }">
                            <v-btn v-if="!display.xs.value" variant="tonal" :color="color" icon="mdi-plus" v-bind="props"/>
                        </template>
                        <v-list class="pa-0">
                            <PlaidLink></PlaidLink>
                            <v-list-item v-bind="dialog" @click="newItem">Custom {{ props.type }}</v-list-item>
                        </v-list>
                    </v-menu>

                    <!-- Add or edit asset dialog -->
                    <v-dialog v-model="dialog" max-width="400px">
                        <v-card class="pa-4 text-center mx-auto" width="330">
                            <v-card-title class="font-weight-light text-center">{{ formTitle }}</v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-text-field v-model="editedItem.name" variant="underlined" label="Name"></v-text-field>
                                    <v-select v-model="editedItem.type" :items="props.type == 'Asset' ? assetTypes : debtTypes" variant="underlined" density="compact" label="Type"></v-select>
                                    <v-text-field v-model="editedItem.value" variant="underlined" label="Value"></v-text-field>
                                </v-container>
                            </v-card-text>
                            <v-btn rounded="0" width="200" class="mx-auto bg-primary" @click="save">Save</v-btn>
                            <v-btn rounded="0" width="200" class="mx-auto font-weight-light" variant="plain" @click="dialog = false">Cancel</v-btn>
                        </v-card>
                    </v-dialog>

                    <!-- Delete asset dialog -->
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card class="pa-4 text-center mx-auto" width="330">
                            <v-card-text class="font-weight-light mb-4">Are you sure you want to delete this {{ props.type.toLowerCase() }}?</v-card-text>
                            <v-btn rounded="0" width="200" class="mx-auto bg-error" @click="deleteItemConfirm">Yes</v-btn>
                            <v-btn rounded="0" width="200" variant="plain" class="mx-auto font-weight-light text-error" @click="deleteItemAndHistory">Yes, and its history</v-btn>
                            <v-btn rounded="0" width="200" variant="plain" class="mx-auto font-weight-light" @click="dialogDelete = false">Cancel</v-btn>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:[`item.value`]="{ item }">
                <span v-if="item.value" :class="{blur: store.privacy}">{{ formatCurrency(parseFloat(item.value)) }}</span>
            </template>

            <template v-slot:[`item.updated`]="{ item }">
                <span v-if="item.updated">{{ new Date(item.updated).toLocaleDateString() }}</span>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" class="mr-2" @click="focusItem(item)">{{ item.is_hidden ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                <v-icon size="small" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>

            <template v-slot:no-data>
                <div class="font-weight-light text-disabled">No {{ props.url }} have been added</div>
            </template>

            <template v-slot:bottom></template>
        </v-data-table>
    </v-card>
</template>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import { useStore } from '/src/pinia'
const store = useStore()
import { useDisplay } from 'vuetify'
const display = useDisplay()
import PlaidLink from '/src/components/PlaidLink'
const props = defineProps(['color', 'type', 'url', 'tableData', 'totalValue'])

const dialog = ref(false)
const dialogDelete = ref(false)
const editedIndex = ref(-1)
const editedItem = ref({
    name: '',
    type: null,
    value: null,
})
const defaultItem = {
    name: '',
    type: null,
    value: null,
}
const assetTypes = [
    'Bank Account',
    'Investment Account',
    'Retirement Account',
    'Vehicle',
    'Real Estate',
    'Foreign Currency',
    'Crytocurrency',
    'Precious Metal',
    'Art',
    'Other'
]

const debtTypes = [
    'Credit Card',
    'Mortgage',
    'Car Loan',
    'Student Loan',
    'Other'
]

function focusItem(item) {
    if (item.is_hidden) {
        axios.put(`/${props.url}/show/${item.id}`).then(() => {
            store.getAllAssetData()
        })
    }
    else {
        axios.put(`/${props.url}/hide/${item.id}`).then(() => {
            store.getAllAssetData()
        })
    }
}

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New ' + props.type : 'Edit ' + props.type
})

const headers = computed(() => {
    if (display.xs.value) {
        return [
            { title: 'Name', align: 'start', key: 'name' },
            { title: 'Value', align: 'end', key: 'value' },
        ]
    }
    else {
        return [
            { title: 'Name', align: 'start', key: 'name' },
            { title: 'Type', align: 'start', key: 'type' },
            { title: 'Value', align: 'end', key: 'value' },
            { title: 'Updated', align: 'end', key: 'updated' },
            { title: 'Actions', align: 'end', key: 'actions', sortable: false, minWidth: '105px' },
        ]
    }
})

function formatCurrency(value) {
    if (typeof value !== "number") {
        return value
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    return formatter.format(value);
}

function newItem() {
    editedItem.value = Object.assign({}, defaultItem)
    editedIndex.value = -1
    dialog.value = true
}

function editItem (item) {
    editedIndex.value = props.tableData.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialog.value = true
}

function deleteItem (item) {
    editedIndex.value = props.tableData.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialogDelete.value = true
}

function save () {
    if (editedIndex.value > -1) {
        replaceInDatabase(editedItem.value)
    } else {
        addToDatabase(editedItem.value)
    }
    dialog.value = false
}

function deleteItemAndHistory() {
    axios.delete(`/${props.url}/${editedItem.value.id}/history`).then(() => {
        store.getAllAssetData()
        dialogDelete.value = false
    })
}

function deleteItemConfirm() {
    axios.delete(`/${props.url}/${editedItem.value.id}`).then(() => {
        store.getAllAssetData()
        dialogDelete.value = false
    })
}

function addToDatabase(item) {
    axios.post(`/${props.url}`, {
        name: item.name,
        type: item.type,
        value: item.value.replace(',', ''),
    })
    .then(() => {
        store.getAllAssetData()
    })
}

function replaceInDatabase(item) {
    axios.put(`/${props.url}/${item.id}`, {
        name: item.name,
        type: item.type,
        value: item.value.replace(',', ''),
        user_id: store.userID,
    })
    .then(() => {
        store.getAllAssetData()
    })
}
</script>