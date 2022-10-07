<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart :theme="$vuetify.theme.themes.light.error" :series="lineChartData"/>
        </v-flex>

        <v-flex xs12 md6>
            <Table type="Debt" url="debts" :tableData="tableData" :totalValue="totalValue"/>
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
import axios from 'axios'

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

            totalValue: null,

            pieChartValues: [],
            pieChartLabels: [],

            lineChartData: [{
                name: 'Total Debts',
                data: []
            }],
        }
    },

    mounted() {
        this.loadData()
    },

    methods: {
        async loadData() {
            this.totalValue = null
            this.lineChartData[0].data = []
            this.pieChartValues = []
            this.pieChartLabels = []

            axios.get(`http://localhost:3000/api/debts`)
            .then((resp) => {
                let debtData = resp.data
                this.tableData = debtData.filter(e => e.is_deleted == 0)

                if (debtData.length) {
                    this.totalValue = 0
                    for (let debt of debtData) {
                        if (!debt.is_deleted) {
                            this.pieChartLabels.push(debt.name)
                            this.pieChartValues.push(Math.abs(parseFloat(debt.value)))
                            this.totalValue += parseFloat(debt.value)
                        }
                    }
                }
                
                this.$store.commit('setTotalDebtValue', this.totalValue)

                axios.get(`http://localhost:3000/api/debts/history`)
                .then(resp => {
                    this.refineAssets(debtData, resp.data)
                })
            })
        },

        refineAssets(assetData, history) {
            // Get all individual assets
            let assets = []
            for (let asset of assetData) {
                assets.push({
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
                    if (!asset.history.some(e => e.x == date) && asset.history.length) {
                        asset.history.push({
                            x: date,
                            y: parseFloat(asset.history[asset.history.length - 1].y)
                        })
                    }
                }
            }

            // Turn the asset data into something the line chart can read
            for (let asset of assets) {
                for (let entry of asset.history) {
                    let i = this.lineChartData[0].data.findIndex(e => e.x == entry.x)
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
})
</script>