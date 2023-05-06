<template>
    <v-card class="ma-2 pl-8" elevation="4">
        <apexchart v-if="series[0].data.length && series[1].data.length" type="treemap" :options="chartOptions" :series="series"></apexchart>
    </v-card>
</template>

<script>
export default {
    name: 'TreeMapChart',
    props: ['series'],

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
                colors: [this.$vuetify.theme.themes.light.primary, this.$vuetify.theme.themes.light.error],
                theme: {
                    mode: this.getTheme,
                },
                legend: {
                    position: 'right'
                },
                tooltip: {
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
                    toolbar: {
                        show: false,
                    },
                    background: 'none',
                }
            }
        }
    },
}
</script>