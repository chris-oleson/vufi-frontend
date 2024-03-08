<template>
    <v-navigation-drawer permanent floating :rail="mobile" elevation="4">
        <v-list class="font-weight-light pa-0">
            <v-list-item replace slim prepend-icon="mdi-cash-multiple" class="py-4 pr-0" to="/assets">
                <div class="d-flex justify-space-between">
                    <div class="d-inline ml-2 text-no-wrap">Assets</div>
                    <div class="d-inline pr-4 text-no-wrap" :class="{blur: store.privacy}">{{ formatCurrency(store.totalAssetValue) }}</div>
                </div>
            </v-list-item>

            <v-list-item replace slim prepend-icon="mdi-credit-card-multiple" class="py-4 pr-0" to="/debts">
                <div class="d-flex justify-space-between">
                    <div class="d-inline ml-2 text-no-wrap">Debts</div>
                    <div class="d-inline pr-4 text-no-wrap" :class="{blur: store.privacy}">{{ formatCurrency(0 - store.totalDebtValue) }}</div>
                </div>
            </v-list-item>

            <v-list-item replace slim prepend-icon="mdi-sigma" class="py-4 pr-0" to="/net-worth">
                <div class="d-flex justify-space-between">
                    <div class="d-inline ml-2 text-no-wrap">Net Worth</div>
                    <div class="d-inline pr-4 text-no-wrap" :class="{blur: store.privacy}">{{ formatCurrency(store.totalAssetValue - store.totalDebtValue) }}</div>
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

function formatCurrency(value) {
    if (store.currency != 'USD') {
        value *= store.currencyRates[store.currency]
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: store.currency
    })
    return formatter.format(value);
}
</script>