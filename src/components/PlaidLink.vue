<template>
    <v-btn @click="openPlaid">Plaid Link</v-btn>
</template>

<script setup>
import axios from 'axios'

let plaid

function openPlaid() {
    axios.post('plaid/create-link-token').then((res) => {
        plaid = window.Plaid.create({
            token: res.data.link_token,
            onSuccess: (public_token) => {
                console.log(public_token)
            },
            onLoad: () => {},
            onExit: (err) => {},
            onEvent: (eventName) => {},
        })
        plaid.open()
    })
}
</script>