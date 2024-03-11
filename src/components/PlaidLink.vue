<template>
    <v-btn v-if="props.update" tile class="bg-warning mr-3" variant="tonal" @click="getLinkToken">Reauthenticate</v-btn>
    <v-list-item v-else @click="getLinkToken">Financial Account</v-list-item>
</template>

<script setup>
import axios from 'axios'
import { useStore } from '/src/pinia'
import { router } from '../router';
const store = useStore()
const props = defineProps(['update'])

function getLinkToken() {
    if (store.subscriptionStatus == 'active') {
        axios.post('/plaid/link-token', {
            update: props.update
        }).then((res) => {
            if (res.data) {
                console.log(res.data)
                let plaid = window.Plaid.create({
                    token: res.data.link_token,
                    onSuccess: (public_token) => {
                        if (!props.update) {
                            sendPublicToken(public_token)
                        }
                    },
                    onExit: (err) => {
                        console.log('Unexpected error:')
                        console.log(err)
                    },
                })
                plaid.open()
            }
            else {
                console.log('Link token required')
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }
    else {
        router.push('/pricing')
    }
}

function sendPublicToken(token) {
    axios.post('/plaid/public-token', {
        publicToken: token
    }).then(() => {
        updatePlaidData()
    }).catch((err) => {
        console.log(err.message)
    })
}

function updatePlaidData() {
    axios.post('plaid/update').then(() => {
        store.getAllAssetData()
    }).catch((err) => {
        console.log(err.message)
    })
}
</script>