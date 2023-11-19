<template>
    <v-row class="ma-2">
        <v-col v-if="lineChartData[0].data.length" cols="12">
            <LineChart :color="theme.current.value.colors.primary" :series="lineChartData"/>
        </v-col>

        <v-col cols="12" md="6">
            <DataTable type="Asset" url="assets" :color="theme.current.value.colors.primary" :tableData="tableData" :totalValue="store.totalPositiveAssets"/>
        </v-col>

        <v-col v-if="pieChartValues.length" cols="12" md="6">
            <PieChart :color="theme.current.value.colors.primary" :series="pieChartValues" :labels="pieChartLabels"/>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from '/src/pinia'
const store = useStore()
import { useTheme } from 'vuetify'
const theme = useTheme()
import DataTable from '/src/components/DataTable.vue'
import PieChart from '/src/components/PieChart.vue'
import LineChart from '/src/components/LineChart.vue'

const tableData = ref([])
const pieChartLabels = ref([])
const pieChartValues = ref([])

formatData()

watch(() => store.allAssets, () => {
    formatData()
})

function formatData() {
    pieChartLabels.value = []
    pieChartValues.value = []
    tableData.value = []
    if (store.allAssets.length) {
        for (let asset of store.allAssets) {
            if (!asset.is_deleted && asset.value >= 0) {
                pieChartLabels.value.push(asset.name)
                pieChartValues.value.push(parseFloat(asset.value))
                tableData.value.push(asset)
            }
        }
    }
}

const lineChartData = computed(() => {
    return [{
        name: 'Total Assets',
        data: refineHistory(store.allAssets, store.allHistory)
    }]
})

function refineHistory(assets, history) {
    // Remove negative assets
    assets = assets.filter(e => e.value >= 0)
    history = history.filter(e => e.value >= 0)

    // Get all individual assets
    let assetList = []
    for (let asset of assets) {
        assetList.push({
            id: asset.id,
            history: []
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