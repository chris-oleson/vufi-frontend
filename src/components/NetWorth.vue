<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart :theme="$vuetify.theme.themes.light.primary" :series="lineChartData"/>
        </v-flex>

        <v-flex xs12 md6>
            <TreeMapChart :series="treeChartData"/>
        </v-flex>
    </v-row>
</template>

<script>
import LineChart from '/src/components/LineChart.vue'
import TreeMapChart from '/src/components/TreeMapChart.vue'

export default {
    name: 'NetWorth',
    components: {
        LineChart,
        TreeMapChart,
    },

    data() {
        return {
            treeChartData:[
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
                data: this.refineHistory(this.$store.state.allAssets, this.$store.state.allHistory)
            }],
        }
    },

    mounted() {
        for (let asset of this.$store.state.allAssets) {
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
    },

    methods: {
        refineHistory(assets, history) {
            // Get all individual assets
            let assetList = []
            for (let asset of assets) {
                assetList.push({
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
            for (let asset of assetList) {
                for (let date of uniqueDates) {
                    // Check if there is any value for that asset on that date, add it if there is.
                    for (let entry of history) {
                        if (entry.date == date && entry.asset_id == asset.id && asset.is_debt) {
                            asset.history.push({
                                x: entry.date,
                                y: 0 - parseFloat(entry.value)
                            })
                        }
                        else if (entry.date == date && entry.asset_id == asset.id && !asset.is_debt) {
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