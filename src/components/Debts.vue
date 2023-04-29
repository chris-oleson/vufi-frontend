<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart :theme="$vuetify.theme.themes.light.error" :series="lineChartData"/>
        </v-flex>

        <v-flex xs12 md6>
            <Table type="Debt" url="debts" :tableData="this.$store.state.debts.tableData" :totalValue="$store.state.debts.totalValue"/>
        </v-flex>

        <v-flex xs12 md6>
            <PieChart type="Debt" :series="this.$store.state.debts.pieChartValues" :labels="this.$store.state.debts.pieChartLabels"/>
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
            lineChartData: [{
                name: 'Total Debts',
                data: []
            }],
        }
    },

    mounted() {
        this.$store.dispatch('getDebtData')
    },

    methods: {
        
    }
})
</script>