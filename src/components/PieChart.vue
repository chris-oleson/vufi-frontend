<template>
    <v-card class="ma-2 pa-2" elevation="4">
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
                return this.$vuetify.theme.themes.light.primary
            }
            else if (this.type == "Debt") {
                return this.$vuetify.theme.themes.light.error
            }
            else {
                return false
            }
        },

        chartOptions() {
            return {
                colors: [this.$vuetify.theme.themes.light.primary, this.$vuetify.theme.themes.light.error],
                theme: {
                    mode: this.getTheme,
                    monochrome: {
                        enabled: this.getColor,
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