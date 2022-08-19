<template>
    <v-card class="ma-2 pa-4">
        <apexchart v-if="historicData[0].data.length" type="area" :options="chartOptions" :series="historicData"></apexchart>
    </v-card>
</template>

<script>
export default {
    name: 'LineChart',
    props: ['theme'],

    computed: {
        historicData() {
            return [{
                name: "Net Worth",
                data: this.$store.state.historicData
            }]
        },

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
                chart: {
                    toolbar: {
                        show: false,
                        tools: {
                            zoom: false,
                        },
                    },

                    background: 'none'
                },
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
                            return smallest * 2
                        }
                    },
                    max: function(biggest) { return biggest * 1.1 },
                    forceNiceScale: true,
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
                }
            }
        }
    }
}
</script>