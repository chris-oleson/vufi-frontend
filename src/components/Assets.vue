<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart :theme="$vuetify.theme.themes.light.primary" :series="lineChartData"/>
        </v-flex>

        <v-flex xs12 md6>
            <Table type="Asset" url="assets" :tableData="$store.state.assets.tableData" :totalValue="$store.state.assets.totalValue"/>
        </v-flex>

        <v-flex xs12 md6>
            <PieChart type="Asset" :series="$store.state.assets.pieChartValues" :labels="$store.state.assets.pieChartLabels"/>
        </v-flex>
    </v-row>
</template>

<script>
import Table from '/src/components/Table.vue'
import PieChart from '/src/components/PieChart.vue'
import LineChart from '/src/components/LineChart.vue'

export default ({
    name: 'Assets',
    components: {
        Table,
        PieChart,
        LineChart,
    },

    data() {
        return {

        }
    },

    mounted() {
        //this.$store.dispatch('getAssetData')
    },

    computed: {
        lineChartData() {
            return [{
                name: 'Total Assets',
                data: this.$store.state.assets.history
            }]
        }
    },

    methods: {
        refineHistory() {
            // // Get all individual assets
            // let assets = []
            // for (let asset of this.$store.state.assets.raw) {
            //     assets.push({
            //         id: asset.id,
            //         history: []
            //     })
            // }

            // // Get all dates that there are records for
            // let uniqueDates = []
            // for (let entry of this.$store.state.assets.history) {
            //     if (!uniqueDates.includes(entry.date)) {
            //         uniqueDates.push(entry.date)
            //     }
            // }
            // uniqueDates = uniqueDates.sort()

            // // Go through every asset
            // for (let asset of assets) {
            //     for (let date of uniqueDates) {                    
            //         // Check if there is any value for that asset on that date, add it if there is.
            //         for (let entry of this.$store.state.assets.history) {
            //             if (entry.date == date && entry.asset_id == asset.id) {
            //                 asset.history.push({
            //                     x: entry.date,
            //                     y: parseFloat(entry.value)
            //                 })
            //             }
            //         }
            //         // If the asset doesn't have an entry for a date with data, add one with the previous value.
            //         if (!asset.history.some(e => e.x == date)) {
            //             if (asset.history.length) {
            //                 asset.history.push({
            //                     x: date,
            //                     y: parseFloat(asset.history[asset.history.length - 1].y)
            //                 })
            //             }
            //         }
            //     }
            // }

            // // Turn the asset data into something the line chart can read
            // for (let asset of assets) {
            //     for (let entry of asset.history) {
            //         let i = this.lineChartData[0].data.findIndex(e => e.x == entry.x)
            //         if (i < 0) {
            //             this.lineChartData[0].data.push(entry)
            //         }
            //         else {
            //             this.lineChartData[0].data[i].y += entry.y
            //         }
            //     }
            // }
        },
    }
})
</script>