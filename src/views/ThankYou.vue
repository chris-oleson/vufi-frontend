<template>
    <div class="text-center">
        <h1 class="mt-10 font-weight-light">Thank you for subscribing to VuFi!</h1>
        <v-btn rounded="0" class="mt-10 bg-primary" @click="loadData">Go to dashboard</v-btn>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useStore } from '/src/pinia'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()

async function loadData() {
    const resp = await axios.get('user/subscription-status')
    if (resp.data == 'active') {
        store.subscriptionStatus = 'active'
        await store.getAllAssetData()
        router.push('/assets')
    }
}
</script>