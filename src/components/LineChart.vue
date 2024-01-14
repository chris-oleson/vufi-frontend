<template>
    <v-card class="pa-2" height="300" elevation="4">
        <apexchart type="area" :options="chartOptions" :series="series" height="100%"></apexchart>
    </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
const theme = useTheme()
const display = useDisplay()
const props = defineProps(['color', 'series'])

const chartOptions = computed(() => {
    return {
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 1,
            curve: 'straight',
        },
        yaxis: {
            show: !display.xs.value,
            labels: {
                formatter: function (value) {
                    var formatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    });
                    return formatter.format(value);
                }
            },
            min: function(smallest) {
                if (smallest > 0) {
                    return 0
                }
                else {
                    return smallest * 1.5
                }
            },
            max: function(biggest) {
                if (biggest > 0) {
                    return biggest * 1.1
                }
                else {
                    return 0
                }
            },
            tickAmount: 4
        },
        xaxis: {
            labels: {
                show: !display.xs.value,
            },
            type: 'datetime',
            tooltip: {
                enabled: false
            }
        },
        fill: {
            type: 'gradient',
                gradient: {
                shadeIntensity: 0,
                opacityFrom: 1,
                opacityTo: 0,
            }
        },
        colors: [props.color],
        tooltip: {
            theme: theme.global.name.value
        },
        theme: {
            mode: theme.global.name.value
        },
        chart: {
            animations: {
                enabled: false
            },
            toolbar: {
                show: false,
                tools: {
                    zoom: false,
                },
            },
            background: 'none'
        }
    }
})
</script>