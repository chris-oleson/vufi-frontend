<template>
    <div class="mr-8 mb-8">
        <h2 class="mb-4 mt-8 font-weight-light text-center">Asset Distribution</h2>

        <v-sheet class="pa-4" elevation="2">
            <apexchart v-if="series.length" type="pie" :options="options" :series="series"></apexchart>
        </v-sheet>
    </div>
</template>

<script>
export default {
    name: 'AssetDistribution',

    data() {
        return {
            options: {
                chart: {
                    type: 'pie',
                },
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                theme: {
                    monochrome: {
                        enabled: true,
                        color: '#aed581',
                    },
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            offset: -5
                        }
                    }
                },
                dataLabels: {
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex]
                        return [name, val.toFixed(1) + '%']
                    }
                },
                legend: {
                    show: false
                }
            },

            series: [25, 15, 44, 55, 41, 17],
        }
    }
}
</script>