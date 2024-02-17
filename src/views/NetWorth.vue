<template>
    <v-row v-if="store.allAssets.length || store.allDebts.length" class="ma-2">
        <v-col v-if="lineChartData[0].data.length > 1" cols="12">
            <LineChart :color="theme.current.value.colors.primary" :series="lineChartData"/>
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
        data: refineHistory(store.allAssets, store.allDebts, store.allAssetHistory, store.allDebtHistory)
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

    for (let asset of store.allAssets) {
        if (!asset.is_deleted && !asset.is_hidden) {
            charts[0].data.push({
                x: asset.name,
                y: parseFloat(asset.value)
            })
        }
    }

    for (let debt of store.allDebts) {
        if (!debt.is_deleted && !debt.is_hidden) {
            charts[1].data.push({
                x: debt.name,
                y: parseFloat(debt.value)
            })
        }
    }

    if (charts[0].data.length) {
        treeChartData.value.push(charts[0])
    }
    if (charts[1].data.length) {
        treeChartData.value.push(charts[1])
    }
}

function refineHistory(assets, debts, assetHistory, debtHistory) {
    // Get all individual assets
    let assetList = []
    for (let asset of assets) {
        assetList.push({
            id: asset.id,
            history: []
        })
    }
    for (let debt of debts) {
        assetList.push({
            id: debt.id,
            history: []
        })
    }

    // Combine histories
    let history = []
    history.push(...assetHistory)
    for (let entry of debtHistory) {
        history.push({
            asset_id: entry.debt_id,
            value: parseFloat(entry.value) * -1,
            date: entry.date
        })
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
    for (let asset of assetList) {
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

    for (let asset of assetList) {
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