<template>
    <v-row class="ma-2">
        <v-col v-if="lineChartData[0].data.length" cols="12">
            <LineChart :color="$vuetify.theme.current.colors.primary" :series="lineChartData"/>
        </v-col>

        <v-col cols="12" md="6">
            <DataTable type="Asset" url="assets" :color="$vuetify.theme.current.colors.primary" :tableData="tableData" :totalValue="$store.state.totalPositiveAssets"/>
        </v-col>

        <v-col v-if="pieChartValues.length" cols="12" md="6">
            <PieChart :color="$vuetify.theme.current.colors.primary" :series="pieChartValues" :labels="pieChartLabels"/>
        </v-col>
    </v-row>
</template>

<script>
import DataTable from '/src/components/DataTable.vue'
import PieChart from '/src/components/PieChart.vue'
import LineChart from '/src/components/LineChart.vue'

export default {
    name: 'vufi-assets',
    components: {
        DataTable,
        PieChart,
        LineChart,
    },

    data() {
        return {
            tableData: [],
            pieChartLabels: [],
            pieChartValues: [],
        }
    },

    created() {
        if (!this.$store.state.isLoggedIn) {
            this.$router.push('/login')
        }

        this.formatData()
    },

    watch: {
        '$store.state.allAssets': () => {
            this.formatData()
        }
    },

    computed: {
        lineChartData() {
            return[{
                name: 'Total Assets',
                data: this.refineHistory(this.$store.state.allAssets, this.$store.state.allHistory)
            }]
        },
    },

    methods: {
        formatData() {
            // Clear current data
            this.pieChartLabels = []
            this.pieChartValues = []
            this.tableData = []

            // Set pie chart & table data
            if (this.$store.state.allAssets.length) {
                for (let asset of this.$store.state.allAssets) {
                    if (!asset.is_deleted && asset.value >= 0) {
                        this.pieChartLabels.push(asset.name)
                        this.pieChartValues.push(parseFloat(asset.value))
                        this.tableData.push(asset)
                    }
                }
            }
        },

        refineHistory(assets, history) {
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
    }
}
</script>