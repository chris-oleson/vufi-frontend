<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart :theme="$vuetify.theme.themes.light.error" :series="lineChartData"/>
        </v-flex>

        <v-flex xs12 md6>
            <Table type="Debt" url="debts" :tableData="tableData" :totalValue="$store.state.totalNegativeAssets"/>
        </v-flex>

        <v-flex xs12 md6>
            <PieChart type="Debt" :series="pieChartValues" :labels="pieChartLabels"/>
        </v-flex>
    </v-row>
</template>

<script>
import Table from '/src/components/Table.vue'
import PieChart from '/src/components/PieChart.vue'
import LineChart from '/src/components/LineChart.vue'

export default ({
    name: 'Debts',
    components: {
        Table,
        PieChart,
        LineChart,
    },

    data() {
        return {
            tableData: [],
            pieChartLabels: [],
            pieChartValues: [],
            lineChartData: [{
                name: 'Total Assets',
                data: this.refineHistory(this.$store.state.allAssets, this.$store.state.allHistory)
            }]
        }
    },

    created() {
        // Set pie chart & table data
        if (this.$store.state.allAssets.length) {
            for (let asset of this.$store.state.allAssets) {
                if (!asset.is_deleted && asset.is_debt) {
                    this.pieChartLabels.push(asset.name)
                    this.pieChartValues.push(parseFloat(asset.value))
                    this.tableData.push(asset)
                }
            }
        }
    },

    methods: {
        refineHistory(assets, history) {
            // Remove negative assets
            assets = assets.filter(e => e.is_debt == 1)

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
    }
})
</script>