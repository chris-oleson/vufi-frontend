<template>
    <v-card class="pa-2 pl-5" elevation="4">
        <apexchart type="treemap" :options="chartOptions" :series="props.series"></apexchart>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'
const theme = useTheme()
const props = defineProps(['series'])

const chartOptions = ref({
    colors: [theme.current.value.colors.primary, theme.current.value.colors.error],
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
    }
})
</script>