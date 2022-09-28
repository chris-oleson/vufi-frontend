<template>
    <v-card class="ma-2 pa-2" height="300" elevation="4">
        <apexchart v-if="series[0].data.length" type="area" :options="chartOptions" :series="series" height="100%"></apexchart>
    </v-card>
</template>

<script>
export default {
    name: 'LineChart',
    props: ['theme', 'series'],

    computed: {
        getTheme() {
            if (this.$vuetify.theme.dark) {
                return 'dark'
            }
            else {
                return 'light'
            }
        },

        chartOptions() {
            return {
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 1
                },
                yaxis: {
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
                    forceNiceScale: true,
                    tickAmount: 4
                },
                xaxis: {
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
                colors: [this.theme],
                tooltip: {
                    theme: this.getTheme
                },
                theme: {
                    mode: this.getTheme,
                },
                chart: {
                    toolbar: {
                        show: false,
                        tools: {
                            zoom: false,
                        },
                    },
                    animations: {
                        enabled: false,
                    },
                    background: 'none'
                },
            }
        }
    }
}
</script>