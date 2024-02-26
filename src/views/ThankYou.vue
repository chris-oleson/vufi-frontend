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

function loadData() {
    axios.get('auth/expires').then((resp) => {
        store.subscriptionStatus = getSubscriptionStatus(resp.data)
        router.push('/assets')
    }).catch(() => {
        router.push('/login')
    })
}

function getSubscriptionStatus(expiration) {
    if (!expiration) {
        return 'Free'
    }
    else if (expiration >= getToday()) {
        return 'Active'
    }
    else {
        return 'Canceled'
    }
}

function getToday() {
    return formatDate(Date.now())
}

function formatDate(date) {
    let d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}
</script>