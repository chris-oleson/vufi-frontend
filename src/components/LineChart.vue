<template>
    <v-card class="pa-2" height="300" elevation="4">
        <apexchart type="area" :options="chartOptions" :series="series" height="100%"></apexchart>
    </v-card>
</template>

<script>
export default {
    name: 'LineChart',
    props: ['color', 'series'],

    computed: {
        chartOptions() {
            return {
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 1
                },
                yaxis: {
                    show: !this.$vuetify.display.xs,
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
                colors: [this.color],
                tooltip: {
                    theme: this.$vuetify.theme.name
                },
                theme: {
                    mode: this.$vuetify.theme.name
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
                },
            }
        }
    }
}
</script>