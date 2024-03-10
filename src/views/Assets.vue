<template>
    <v-row class="ma-2">
        <v-col v-if="lineChartData[0].data.length" cols="12">
            <LineChart :color="theme.current.value.colors.primary" :series="lineChartData"/>
        </v-col>

        <v-col cols="12" md="7">
            <DataTable type="Asset" url="assets" :color="theme.current.value.colors.primary" :tableData="tableData" :totalValue="store.totalAssetValue"/>
        </v-col>

        <v-col v-if="pieChart.values.length" cols="12" md="5">
            <PieChart :color="theme.current.value.colors.primary" :series="pieChart.values" :labels="pieChart.labels"/>
        </v-col>
    </v-row>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '/src/pinia'
const store = useStore()
import { useTheme } from 'vuetify'
const theme = useTheme()
import DataTable from '/src/components/DataTable'
import PieChart from '/src/components/PieChart'
import LineChart from '/src/components/LineChart'

const tableData = computed(() => {
    return store.allItems.filter((item) => !item.is_deleted && item.type == 'asset')
})

const pieChart = computed(() => {
    let labels = []
    let values = []
    for (let item of store.allItems) {
        if (!item.is_hidden && !item.is_deleted && item.type == 'asset') {
            labels.push(item.name)
            values.push(parseFloat(item.value))
        }
    }
    
    return {
        labels: labels,
        values: values,
    }
})

const lineChartData = computed(() => {
    return [{
        name: 'Total Assets',
        data: refineHistory(store.allItems, store.allItemHistory)
    }]
})

function refineHistory(items, history) {
    // Get all individual assets
    let visibleAssets = []
    for (let item of items) {
        if (!item.is_hidden && item.type == 'asset') {
            visibleAssets.push({
                id: item.id,
                currency: item.currency,
                history: []
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

    // Go through every visible asset
    for (let asset of visibleAssets) {
        for (let date of uniqueDates) {
            // Check if there is any value for that asset on that date, add it if there is.
            for (let entry of history) {
                if (entry.date == date && entry.item_id == asset.id) {
                    asset.history.push({
                        x: entry.date,
                        y: convertValue(parseFloat(entry.value), asset.currency)
                    })
                }
            }

            // If the asset doesn't have an entry for a date with data, add one with the previous value.
            if (!asset.history.some(e => e.x == date)) {
                if (asset.history.length) {
                    asset.history.push({
                        x: date,
                        y: parseFloat(asset.history[asset.history.length - 1].y)
                    })
                }
            }
        }
    }

    // Turn the asset data into something the line chart can read
    let refinedHistory = []
    for (let asset of visibleAssets) {
        for (let entry of asset.history) {
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

function convertValue(value, currency) {
    return value /= store.currencyRates[currency]
}
</script>