<template>
    <v-row v-if="store.allItems.length" class="ma-2">
        <v-col cols="12">
            <LineChart :color="getColor()" :series="lineChartData"/>
        </v-col>

        <v-col cols="12" md="6">
            <TreeMapChart :series="treeChartData"/>
        </v-col>
    </v-row>
    <div v-else class="font-weight-light ma-4 text-disabled">No assets or debts have been added</div>
</template> 

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '/src/pinia'
const store = useStore()
import { useTheme } from 'vuetify'
const theme = useTheme()
import LineChart from '/src/components/LineChart'
import TreeMapChart from '/src/components/TreeMapChart'

const treeChartData = ref([])

const lineChartData = computed(() => {
    return [{
        name: 'Net Worth',
        data: refineHistory(store.allItems, store.allItemHistory)
    }]
})

formatData()

function formatData() {
    let charts = [
        {
            name: 'Assets',
            data: []
        },
        {
            name: 'Debts',
            data: []
        }
    ]

    for (let item of store.allItems) {
        if (!item.is_deleted && !item.is_hidden) {
            if (item.type == 'asset') {
                charts[0].data.push({
                    x: item.name,
                    y: parseFloat(item.value)
                })
            }
            else {
                charts[1].data.push({
                    x: item.name,
                    y: parseFloat(item.value)
                })
            }
        }
    }

    if (charts[0].data.length) {
        treeChartData.value.push(charts[0])
    }
    if (charts[1].data.length) {
        treeChartData.value.push(charts[1])
    }
}

function refineHistory(items, history) {
    // Get all individual items
    let visibleItems = []
    for (let item of items) {
        if (!item.is_hidden) {
            visibleItems.push({
                id: item.id,
                type: item.type,
                history: [],
                currency: store.currency
            })
        }
    }

    // Get all dates that there are records for
    let uniqueDates = []
    for (let entry of history) {
        if (!uniqueDates.includes(entry.date)) {
            uniqueDates.push(entry.date)
        }
    }
    uniqueDates = uniqueDates.sort()

    // Go through every asset
    for (let item of visibleItems) {
        for (let date of uniqueDates) {
            // Check if there is any value for that item on that date, add it if there is.
            for (let entry of history) {
                if (entry.date == date && entry.item_id == item.id) {
                    item.history.push({
                        x: entry.date,
                        y: convertValue(parseFloat(entry.value), item.currency, item.type)
                    })
                }
            }

            // If the asset doesn't have an entry for a date with data, add one with the previous value.
            if (!item.history.some(e => e.x == date)) {
                if (item.history.length) {
                    item.history.push({
                        x: date,
                        y: parseFloat(item.history[item.history.length - 1].y)
                    })
                }
            }
        }
    }

    // Turn the asset data into something the line chart can read
    let refinedHistory = []

    for (let item of visibleItems) {
        for (let entry of item.history) {
            let i = refinedHistory.findIndex(e => e.x == entry.x)
            if (i < 0) {
                refinedHistory.push(entry)
            }
            else {
                refinedHistory[i].y += entry.y
            }
        }
    }

    return refinedHistory
}

function convertValue(value, currency, type) {
    if (type == 'debt') {
        value *= -1
    }
    return value /= store.currencyRates[currency]
}

function getColor() {
    if (store.totalAssetValue - store.totalDebtValue < 0) {
        return theme.current.value.colors.error
    }
    else {
        return theme.current.value.colors.primary
    }
}
</script>