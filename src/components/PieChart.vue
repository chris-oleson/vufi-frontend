<template>
    <v-card class="pa-2" elevation="4">
        <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
    </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
const theme = useTheme()
const props = defineProps(['color', 'series', 'labels'])

const chartOptions = computed(() => {
    return {
        theme: {
            mode: theme.name.value,
            monochrome: {
                enabled: true,
                color: props.color,
                shadeTo: theme.name.value,
            },
        },
        labels: props.labels,
        dataLabels: {
            formatter(val) {
                return [val.toFixed(1) + '%']
            },
        },
        legend: {
            show: true,
            position: 'right'
        },
        tooltip: {
            fillSeriesColor: false,
            theme: theme.name.value,
            y: {
                formatter(value) {
                    var formatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    })
                    return formatter.format(value)
                },
            },
        },
        chart: {
            animations: {
                enabled: false
            },
            background: 'none',
        }
    }
})
</script>