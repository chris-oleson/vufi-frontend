<template>
    <v-row class="ma-2">
        <v-flex xs12 sm6 md6 lg6>
            <HistoricData/>
        </v-flex>
    </v-row>
</template>

<script>
import HistoricData from '/src/components/HistoricData.vue'

export default ({
    name: 'NetWorth',

    components: {
        HistoricData,
    },

    mounted() {
        if (!this.$store.state.currentUser.email) {
            this.$router.push('/404')
        }
    },
})
</script>