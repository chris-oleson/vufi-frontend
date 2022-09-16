<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart v-if="historicData.length" theme="#e57373" :series="historicData"/>
        </v-flex>
        <v-flex xs12 md6>
            <Table type="Debt" url="debts" :tableData="debtData" :totalValue="totalValue"/>
        </v-flex>
        <v-flex xs12 md6>
            <PieChart v-if="pieChartValues.length" type="Debt" :series="pieChartValues" :labels="pieChartLabels"/>
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

    data() {
        return {
            debtData: [],
            totalValue: null,
            pieChartValues: [],
            pieChartLabels: [],

            historicData: [],
        }
    },

    components: {
        Table,
        PieChart,
        LineChart,
    },

    mounted() {
        if (!this.$store.state.userID) {
            this.$router.push('/404')
        }

        this.loadData()
    },

    methods: {
        async loadData() {
            await axios.get(`http://localhost:3000/api/debts/${this.$store.state.userID}`)
            .then((resp) => {
                this.debtData = resp.data
            })

            this.totalValue = null
            this.pieChartValues = []
            this.pieChartLabels = []

            if (this.debtData.length) {
                this.totalValue = 0
                for (let debt of this.debtData) {
                    this.pieChartLabels.push(debt.name)
                    this.pieChartValues.push(Math.abs(parseFloat(debt.value)))
                    this.totalValue += parseFloat(debt.value)
                }
            }
            this.$store.commit('setTotalDebtValue', this.totalValue)
        }
    }
})
</script>