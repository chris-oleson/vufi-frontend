<template>
    <v-row class="ma-2">
        <v-flex xs12 md6>
            <LineChart theme="#aed581"/>
        </v-flex>
        <v-flex xs12 md6>
            <PieChart theme="#aed581"/>
        </v-flex>
    </v-row>
</template>

<script>
import LineChart from '/src/components/LineChart.vue'
import PieChart from '/src/components/PieChart.vue'

export default ({
    name: 'NetWorth',

    components: {
        LineChart,
        PieChart,
    },

    mounted() {
        if (!this.$store.state.currentUser.email) {
            this.$router.push('/404')
        }
    },
})
</script>