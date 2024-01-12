<template>    
    <v-list-item @click="getLinkToken">Financial Account</v-list-item>
    <v-list-item @click="updatePlaidData">Update plaid data</v-list-item>
</template>

<script setup>
import axios from 'axios'
import { useStore } from '/src/pinia'
import { router } from '../router';
const store = useStore()

function getLinkToken() {
    if (store.subscriptionStatus == 'active') {
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
    else {
        router.push('/pricing')
    }
}

function sendPublicToken(token) {
    axios.post('plaid/public-token', {
        publicToken: token
    }).then(() => {
        updatePlaidData()
    }).catch((err) => {
        console.log(err.message)
    })
}

function updatePlaidData() {
    axios.post('plaid/update', {
    }).then(() => {
        store.getAllAssetData()
    }).catch((err) => {
        console.log(err.message)
    })
}
</script>