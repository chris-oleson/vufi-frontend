<template>
    <v-list-item @click="getLinkToken">Financial Account</v-list-item>
    <v-list-item @click="getPlaidData">asdf</v-list-item>
</template>

<script setup>
import axios from 'axios'
import { useStore } from '/src/pinia'
const store = useStore()

function getLinkToken() {
    axios.post('plaid/link-token').then((res) => {
        let plaid = window.Plaid.create({
            token: res.data.link_token,
            onSuccess: (public_token) => {
                sendPublicToken(public_token)
            },
        })
        plaid.open()
    }).catch((err) => {
        console.log(err.message)
    })
}

function sendPublicToken(token) {
    axios.post('plaid/public-token', {
        publicToken: token
    }).then(() => {
        getPlaidData()
    }).catch((err) => {
        console.log(err.message)
    })
}

function getPlaidData() {
    axios.get('plaid/accounts', {
    }).then((response) => {
        console.log(response.data)
        store.getAllAssetData()
    }).catch((err) => {
        console.log(err.message)
    })
}
</script>