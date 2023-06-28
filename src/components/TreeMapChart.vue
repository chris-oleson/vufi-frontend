<template>
    <v-card class="pa-2 pl-5" elevation="4">
        <apexchart type="treemap" :options="chartOptions" :series="series"></apexchart>
    </v-card>
</template>

<script>
export default {
    name: 'vufi-tree-map-chart',
    props: ['series'],

    computed: {
        chartOptions() {
            return {
                colors: [this.$vuetify.theme.current.colors.primary, this.$vuetify.theme.current.colors.error],
                theme: {
                    mode: this.$vuetify.theme.name,
                },
                tooltip: {
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