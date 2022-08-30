<template>
    <v-card class="ma-2 pa-2">
        <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
    </v-card>
</template>

<script>
export default {
    name: 'PieChart',
    props: ['theme', 'series', 'labels'],

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
                theme: {
                    mode: this.getTheme,
                    monochrome: {
                        enabled: true,
                        color: this.theme,
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
                    position: 'bottom'
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
                    animations: {
                        enabled: false,
                    }
                }
            }
        }
    }
}
</script>