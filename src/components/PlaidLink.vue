<template>
    <v-list-item @click="openPlaid">Financial Account</v-list-item>
</template>

<script setup>
import axios from 'axios'

function openPlaid() {
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
    }).catch((err) => {
        console.log(err.message)
    })
}
</script>