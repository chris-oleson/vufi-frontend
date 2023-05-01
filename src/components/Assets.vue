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
        
    }
})
</script>