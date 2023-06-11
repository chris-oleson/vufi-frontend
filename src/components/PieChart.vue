<template>
    <v-card class="pa-2" elevation="4">
        <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
    </v-card>
</template>

<script>
export default {
    name: 'PieChart',
    props: ['color', 'series', 'labels'],

    computed: {
        chartOptions() {
            return {
                theme: {
                    mode: this.$vuetify.theme.name,
                    monochrome: {
                        enabled: this.color,
                        color: this.color,
                        shadeTo: this.$vuetify.theme.name,
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
                    theme: this.$vuetify.theme.name,
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
                    animations: {
                        enabled: false
                    },
                    background: 'none',
                }
            }
        }
    },
}
</script>