<template>
    <v-list-item @click="openPlaid">Financial Account</v-list-item>
</template>

<script setup>
import axios from 'axios'
import { useStore } from '/src/pinia'
const store = useStore()

function openPlaid() {
    axios.post('plaid/link-token').then((res) => {
        let plaid = window.Plaid.create({
            token: res.data.link_token,
            onSuccess: (public_token) => {
                addAccounts(public_token)
            },
        })
        plaid.open()
    }).catch((err) => {
        console.log(err.message)
    })
}

function addAccounts(token) {
    axios.post('plaid/public-token', {
        publicToken: token
    }).then(() => {
        store.getAllAssetData()
    }).catch((err) => {
        console.log(err.message)
    })
}
</script>