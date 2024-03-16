<template>
    <v-card class="pb-4 px-4" elevation="4">
        <apexchart type="treemap" :options="chartOptions" :series="props.series"></apexchart>
    </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
const theme = useTheme()
const props = defineProps(['series'])

const chartOptions = computed(() => {
    return {
        colors: [theme.current.value.colors.primary, theme.current.value.colors.error],
        stroke: {
            colors: [theme.current.value.colors.surface]
        },
        theme: {
            mode: theme.name.value,
        },
        tooltip: {
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
            toolbar: {
                show: false,
            },
            background: 'none',
        },
        xaxis: {
            labels: {
                show: false,
            },
        },
    }
})
</script>