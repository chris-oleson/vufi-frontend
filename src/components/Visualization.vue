<template>
    <div class="mr-8 mb-8">
        <h2 class="mb-4 mt-8 font-weight-light text-center">Historic Data</h2>

        <AreaChart/>
    </div>
</template>

<script>
import AreaChart from '/src/components/AreaChart.vue'

export default {
    name: 'Visualization',
    components: {
        AreaChart,
    },

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {

    }
}
</script>