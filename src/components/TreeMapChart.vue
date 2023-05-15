<template>
    <v-card class="ma-2 pl-3" elevation="4">
        <apexchart type="treemap" :options="chartOptions" :series="series"></apexchart>
    </v-card>
</template>

<script>
export default {
    name: 'TreeMapChart',
    props: ['series', 'colors'],

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
                colors: this.colors,
                theme: {
                    mode: this.getTheme,
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