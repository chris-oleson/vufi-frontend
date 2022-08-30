<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart theme="#aed581" :series="historicData"/>
        </v-flex>
        <v-flex xs12 md6>
            <Table title="asset" theme="primary"/>
        </v-flex>
        <v-flex xs12 md6>
            <PieChart theme="#aed581" :series="series" :labels="labels"/>
        </v-flex>
    </v-row>
</template>

<script>
import Table from '/src/components/Table.vue'
import PieChart from '/src/components/PieChart.vue'
import LineChart from '/src/components/LineChart.vue'

export default ({
    name: 'Assets',

    data() {
        return {
            series: [1, 2, 3, 4, 5],
            labels: ['One', 'Two', 'Three', 'Four', 'Five'],

            historicData: [{
                name: "",
                data: [
                    {
                    "x": "Jul 28 2022",
                    "y": 50000,
                    },
                    {
                    "x": "Jul 29 2022",
                    "y": 51000,
                    },
                    {
                    "x": "Jul 30 2022",
                    "y": 62000,
                    },
                    {
                    "x": "Jul 31 2022",
                    "y": 58000,
                    },
                    {
                    "x": "Aug 01 2022",
                    "y": 52000,
                    },
                    {
                    "x": "Aug 02 2022",
                    "y": 47000,
                    },
                    {
                    "x": "Aug 03 2022",
                    "y": 49000,
                    },
                    {
                    "x": "Aug 04 2022",
                    "y": 49000,
                    },
                    {
                    "x": "Aug 05 2022",
                    "y": 50000,
                    },
                    {
                    "x": "Aug 06 2022",
                    "y": 53000,
                    },
                    {
                    "x": "Aug 07 2022",
                    "y": 58000,
                    },
                    {
                    "x": "Aug 08 2022",
                    "y": 62500,
                    },
                    {
                    "x": "Aug 09 2022",
                    "y": 63500,
                    },
                    {
                    "x": "Aug 10 2022",
                    "y": 63500,
                    },
                    {
                    "x": "Aug 11 2022",
                    "y": 69500,
                    },
                    {
                    "x": "Aug 12 2022",
                    "y": 67500,
                    },
                    {
                    "x": "Aug 14 2022",
                    "y": 72500,
                    },
                    {
                    "x": "Aug 15 2022",
                    "y": 72500,
                    },
                    {
                    "x": "Aug 16 2022",
                    "y": 73500,
                    },
                    {
                    "x": "Aug 17 2022",
                    "y": 73500,
                    }
                ]
            }]
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

        // this.$store.commit('setAssets', [])
        // this.$store.dispatch('LOAD_ASSETS')

        // this.$store.commit('setHistory', [])
        // this.$store.dispatch('LOAD_HISTORY')
    },
})
</script>