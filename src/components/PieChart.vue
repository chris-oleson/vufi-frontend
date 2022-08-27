<template>
    <v-card class="ma-2 pa-4">
        <apexchart v-if="this.$store.state.userID" type="pie" :options="chartOptions" :series="series"></apexchart>
    </v-card>
</template>

<script>
export default {
    name: 'PieChart',
    props: ['theme'],

    computed: {
        series() {
            let series = []

            for (let i = 0; i < this.$store.state.assetData.length; i++) {
                if (this.$store.state.assetData[i].value > 0) {
                    series.push(this.$store.state.assetData[i].value)
                }
            }

            return series
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
            let labels = []

            for (let i = 0; i < this.$store.state.assetData.length; i++) {
                if (this.$store.state.assetData[i].value > 0) {
                    labels.push(this.$store.state.assetData[i].assetName)
                }
            }

            return {
                theme: {
                    mode: this.getTheme,
                    monochrome: {
                        enabled: true,
                        color: this.theme,
                        shadeTo: this.getTheme,
                        shadeIntensity: 0.5,
                    },
                },
                labels: labels,
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
                            });
                            return formatter.format(value);
                        },
                    },
                },
                chart: {
                    background: 'none',
                }
            }
        }
    }
}
</script>