<template>
    <v-row class="ma-2">
        <v-flex xs12>
            <LineChart theme="#e57373"/>
        </v-flex>
        <v-flex xs12 md6>
            <Table title="debt" theme="error"/>
        </v-flex>
        <v-flex xs12 md6>
            <PieChart theme="#e57373" :series="series" :labels="labels"/>
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
            labels: ['One', 'Two', 'Three', 'Four', 'Five']
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