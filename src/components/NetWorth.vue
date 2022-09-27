<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart theme="#aed581" :series="lineChartData"/>
        </v-flex>

        <v-flex xs12 md6>
            <PieChart :series="pieChartValues" :labels="pieChartLabels"/>
        </v-flex>
    </v-row>
</template>

<script>
import LineChart from '/src/components/LineChart.vue'
import PieChart from '/src/components/PieChart.vue'
import axios from 'axios'

export default ({
    name: 'NetWorth',
    components: {
        LineChart,
        PieChart,
    },

    data() {
        return {
            pieChartValues: [],
            pieChartLabels: [],

            lineChartData: [{
                name: 'Net Worth',
                data: []
            }],
        }
    },

    mounted() {
        if (!this.$store.state.userID) {
            this.$router.push('/404')
        }

        this.loadData()
    },

    methods: {
        async loadData() {
            this.lineChartData[0].data = []
            this.pieChartValues = [this.$store.state.totalAssetValue, this.$store.state.totalDebtValue],
            this.pieChartLabels = ['Total Assets', 'Total Debts'],
            
            axios.get(`http://localhost:3000/api/assets/${this.$store.state.userID}/all`)
            .then(resp => {
                let assetData = resp.data
                axios.get(`http://localhost:3000/api/assets/${this.$store.state.userID}/history/all`)
                .then(resp => {
                    this.refineAssets(assetData, resp.data)
                })
            })

        },

        refineAssets(assetData, history) {
            // Get all individual assets
            let assets = []
            for (let asset of assetData) {
                assets.push({
                    id: asset.id,
                    is_debt: asset.is_debt,
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
            for (let asset of assets) {
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
            for (let asset of assets) {
                for (let entry of asset.history) {
                    let i = this.lineChartData[0].data.findIndex(e => e.x == entry.x)
                    if (asset.is_debt) {
                        if (i < 0) {
                            entry.y = 0 - entry.y
                            this.lineChartData[0].data.push(entry)
                        }
                        else {
                            this.lineChartData[0].data[i].y -= entry.y
                        }
                    }
                    else {
                        if (i < 0) {
                            this.lineChartData[0].data.push(entry)
                        }
                        else {
                            this.lineChartData[0].data[i].y += entry.y
                        }
                    }
                }
            }
        }
    }
})
</script>