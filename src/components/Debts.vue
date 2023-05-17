<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart :color="getThemeColor" :series="lineChartData"/>
        </v-flex>

        <v-flex xs12 md6>
            <Table type="Debt" url="debts" :tableData="tableData" :totalValue="$store.state.totalNegativeAssets"/>
        </v-flex>

        <v-flex xs12 md6>
            <PieChart :color="getThemeColor" :series="pieChartValues" :labels="pieChartLabels"/>
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
        }
    },

    created() {
        if (!this.$store.state.isLoggedIn) {
            this.$router.push('/404')
        }

        this.formatData()
    },

    watch: {
        '$store.state.allAssets': function() {
            this.formatData()
        }
    },

    computed: {
        lineChartData() {
            return[{
                name: 'Total Debts',
                data: this.refineHistory(this.$store.state.allAssets, this.$store.state.allHistory)
            }]
        },

        getThemeColor() {
            return this.$vuetify.theme.dark ? this.$vuetify.theme.themes.dark.error : this.$vuetify.theme.themes.light.error
        }
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
                    if (!asset.is_deleted && asset.value < 0) {
                        this.pieChartLabels.push(asset.name)
                        this.pieChartValues.push(0 - parseFloat(asset.value))
                        this.tableData.push(asset)
                    }
                }
            }
        },

        refineHistory(assets, history) {
            // Remove positive assets
            assets = assets.filter(e => e.value < 0)
            history = history.filter(e => e.value < 0)

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
                                y: 0 - parseFloat(entry.value)
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