<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart v-if="historicData.length" theme="#aed581" :series="historicData"/>
        </v-flex>
        <v-flex xs12 md6>
            <Table type="Asset" url="assets" :tableData="assetData" :totalValue="totalValue"/>
        </v-flex>
        <v-flex xs12 md6>
            <PieChart v-if="pieChartValues.length" type="Asset" :series="pieChartValues" :labels="pieChartLabels"/>
        </v-flex>
    </v-row>
</template>

<script>
import Table from '/src/components/Table.vue'
import PieChart from '/src/components/PieChart.vue'
import LineChart from '/src/components/LineChart.vue'
import axios from 'axios'

export default ({
    name: 'Assets',
    components: {
        Table,
        PieChart,
        LineChart,
    },

    data() {
        return {
            assetData: [],
            totalValue: null,
            pieChartValues: [],
            pieChartLabels: [],

            historicData: [],
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
            await axios.get(`http://localhost:3000/api/assets/${this.$store.state.userID}`)
            .then((resp) => {
                this.assetData = resp.data
            })

            this.totalValue = null
            this.pieChartValues = []
            this.pieChartLabels = []

            if (this.assetData.length) {
                this.totalValue = 0
                for (let asset of this.assetData) {
                    this.pieChartLabels.push(asset.name)
                    this.pieChartValues.push(parseFloat(asset.value))
                    this.totalValue += parseFloat(asset.value)
                }
            }
            this.$store.commit('setTotalAssetValue', this.totalValue)
        }
    }
})
</script>