<template>
    <v-card class="pa-2" height="300" elevation="4">
        <apexchart type="area" :options="chartOptions" :series="series" height="100%"></apexchart>
    </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
const theme = useTheme()
const { xs } = useDisplay()
const props = defineProps(['color', 'series'])
import { useStore } from '/src/pinia'
const store = useStore()

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
            show: !xs.value && !store.privacy,
            labels: {
                formatter: function (value) {
                    if (store.currency != 'USD') {
                        value *= store.currencyRates[store.currency]
                    }
                    var formatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: store.currency
                    })
                    return formatter.format(value);
                }
            },
            tickAmount: 4
        },
        xaxis: {
            labels: {
                show: !xs.value
            },
            type: 'datetime',
            tooltip: {
                enabled: false
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
            background: 'none',
            toolbar: {
                show: false,
            }
        }
    }
})
</script>