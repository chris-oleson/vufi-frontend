<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart theme="#aed581" :series="lineChartData"/>
        </v-flex>

        <v-flex xs12 md6>
            <TreeMapChart :series="treeChartData"/>
        </v-flex>
    </v-row>
</template>

<script>
import LineChart from '/src/components/LineChart.vue'
import TreeMapChart from '/src/components/TreeMapChart.vue'
import axios from 'axios'

export default ({
    name: 'Dashboard',
    components: {
        LineChart,
        TreeMapChart,
    },

    data() {
        return {
            treeChartData: [
                {
                    name: 'Assets',
                    data: []
                },
                {
                    name: 'Debts',
                    data: []
                }
            ],

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
            this.treeChartData[0].data = []
            this.treeChartData[1].data = []
            
            axios.get(`http://localhost:3000/api/assets/${this.$store.state.userID}/all`)
            .then(resp => {
                let assetData = resp.data

                for (let asset of assetData) {
                    if (asset.is_debt && !asset.is_deleted) {
                        this.treeChartData[1].data.push({
                            x: asset.name,
                            y: parseFloat(asset.value)
                        })
                    }
                    else if (!asset.is_deleted) {
                        this.treeChartData[0].data.push({
                            x: asset.name,
                            y: parseFloat(asset.value)
                        })
                    }
                }

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