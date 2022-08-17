<template>
    <v-sheet class="pa-6 ma-2" elevation="2">
        <apexchart v-if="series.length" type="pie" :options="chartOptions" :series="series"></apexchart>
    </v-sheet>
</template>

<script>
export default {
    name: 'AssetDistribution',

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
                        color: this.$vuetify.theme.themes.light.primary,
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
                    position: 'bottom'
                },
                tooltip: {
                    fillSeriesColor: false,
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