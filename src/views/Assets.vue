<template>
    <v-row class="ma-2">
        <v-col v-if="lineChartData[0].data.length" cols="12">
            <LineChart :color="theme.current.value.colors.primary" :series="lineChartData"/>
        </v-col>

        <v-col cols="12" md="6">
            <DataTable type="Asset" url="assets" :color="theme.current.value.colors.primary" :tableData="store.allAssets" :totalValue="store.totalAssetValue"/>
        </v-col>

        <v-col v-if="pieChartValues.length" cols="12" md="6">
            <PieChart :color="theme.current.value.colors.primary" :series="pieChartValues" :labels="pieChartLabels"/>
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

const pieChartLabels = computed(() => {
    let labels = []
    for (let asset of store.allAssets) {
        if (!asset.hidden) {
            labels.push(asset.name)
        }
    }
    return labels
})

const pieChartValues = computed(() => {
    let values = []
    for (let asset of store.allAssets) {
        if (!asset.hidden) {
            values.push(parseFloat(asset.value))
        }
    }
    return values
})

const lineChartData = computed(() => {
    return [{
        name: 'Total Assets',
        data: refineHistory(store.allAssets, store.allAssetHistory)
    }]
})

function refineHistory(assets, history) {
    // Get all individual assets
    let visibleAssets = []
    for (let asset of assets) {
        if (!asset.hidden) {
            visibleAssets.push({
                id: asset.id,
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
                if (entry.date == date && entry.asset_id == asset.id) {
                    asset.history.push({
                        x: entry.date,
                        y: parseFloat(entry.value)
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
</script>