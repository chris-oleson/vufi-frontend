<template>
    <v-card class="ma-2 pa-2">
        <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
    </v-card>
</template>

<script>
export default {
    name: 'PieChart',
    props: ['type', 'series', 'labels'],

    computed: {
        getTheme() {
            if (this.$vuetify.theme.dark) {
                return 'dark'
            }
            else {
                return 'light'
            }
        },

        getColor() {
            if (this.type == "Asset") {
                return "#aed581"
            }
            else return "#e57373"
        },

        chartOptions() {
            return {
                theme: {
                    mode: this.getTheme,
                    monochrome: {
                        enabled: true,
                        color: this.getColor,
                        shadeTo: this.getTheme,
                        shadeIntensity: 0.5,
                    },
                },
                labels: this.labels,
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                        dataLabels: {
                            offset: -10
                        },
                    }
                },
                dataLabels: {
                    formatter(val) {
                        return [val.toFixed(1) + '%']
                    },
                },
                legend: {
                    position: 'right'
                },
                tooltip: {
                    fillSeriesColor: false,
                    theme: this.getTheme,
                    y: {
                        formatter(value, chart) {
                            var formatter = new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })
                            if (chart.config.theme.monochrome.color == "#aed581") {
                                return formatter.format(value)
                            }
                            else {
                                return formatter.format(0 - value)
                            }
                        },
                    },
                },
                chart: {
                    background: 'none',
                    animations: {
                        enabled: false,
                    }
                }
            }
        }
    },
}
</script>