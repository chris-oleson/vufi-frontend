<template>
    <v-btn @click="openPlaid">Plaid Link</v-btn>
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
            onLoad: () => {},
            onExit: (err) => {},
            onEvent: (eventName) => {},
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