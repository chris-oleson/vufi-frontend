<template>
    <v-navigation-drawer permanent floating :rail="mobile" elevation="4">
        <v-list class="font-weight-light pa-0" :value="page">
            <v-list-item replace slim prepend-icon="mdi-cash-multiple" class="py-4" to="/assets">
                <div class="d-flex justify-space-between">
                    <div class="d-inline ml-2 text-no-wrap">Assets</div>
                    <div class="d-inline">{{ formatCurrency(store.totalAssetValue) }}</div>
                </div>
            </v-list-item>

            <v-list-item replace slim prepend-icon="mdi-credit-card-multiple" class="py-4" to="/debts">
                <div class="d-flex justify-space-between">
                    <div class="d-inline ml-2 text-no-wrap">Debts</div>
                    <div v-if="store.totalDebtValue" class="d-inline">{{ formatCurrency(store.totalDebtValue) }}</div>
                    <div v-else class="d-inline">{{ formatCurrency(0) }}</div>
                </div>
            </v-list-item>

            <v-list-item replace slim prepend-icon="mdi-sigma" class="py-4" to="/net-worth">
                <div class="d-flex justify-space-between">
                    <div class="d-inline ml-2 text-no-wrap">Net Worth</div>
                    <div class="d-inline">{{ formatCurrency(store.totalAssetValue - store.totalDebtValue) }}</div>
                </div>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { useStore } from '/src/pinia'
const store = useStore()
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
import { useRoute } from 'vue-router'
const route = useRoute()

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

function page() {
    if (route.path == "/assets") {
        return 0
    }
    else if (route.path == "/debts") {
        return 1
    }
    else if (route.path == "/net-worth") {
        return 2
    }
}
</script>