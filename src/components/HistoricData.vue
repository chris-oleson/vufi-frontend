<template>
    <div class="mb-8">
        <h2 class="mb-4 mt-8 font-weight-light text-center">Historic Value</h2>

        <v-sheet class="pa-4" elevation="2">
            <apexchart v-if="historicData[0].data.length" type="area" :options="options" :series="historicData"></apexchart>
        </v-sheet>
    </div>
</template>

<script>
export default {
    name: 'HistoricData',

    data() {
        return {
            options: {
                chart: {
                    id: 'vuechart-example',

                    toolbar: {
                        show: true,
                        tools: {
                            download: false,
                            selection: false,
                            zoom: true,
                            zoomin: false,
                            zoomout: false,
                            pan: false,
                            reset: true | '<img src="/static/icons/reset.png" width="20">',
                        },
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 1
                },
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            var formatter = new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            });
                            return formatter.format(value);
                        }
                    },
                    min: function(smallest) {
                        if (smallest > 0) {
                            return 0
                        }
                        else {
                            return smallest * 2
                        }
                    },
                    max: function(biggest) { return biggest * 1.1 },
                    forceNiceScale: true,
                },
                xaxis: {
                    type: 'datetime',
                    tooltip: {
                        enabled: false
                    }
                },
                fill: {
                    type: 'gradient',
                        gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 1,
                        opacityTo: 0,
                    }
                },
                colors: ['#aed581'],
                tooltip: {
                    marker: {
                        show: false
                    }
                },
            },
        }
    },

    mounted() {
        this.$store.dispatch('LOAD_HISTORY')
    },

    computed: {
        historicData() { return [{ data: this.$store.state.historicData }] }
    }
}
</script>