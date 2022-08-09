<template>
    <div class="mb-8">
        <h2 class="mb-4 mt-8 font-weight-light text-center">Historic Value</h2>

        <v-sheet class="pa-4" elevation="2">
            <apexchart v-if="series[0].data.length" type="area" :options="options" :series="series"></apexchart>
        </v-sheet>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'HistoricData',
    props: [],

    data() {
        return {
            assetHistory: [],

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
                            return smallest
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

            series: [{
                name: "Net Worth",
                data: []
            }]
        }
    },

    mounted() {
        this.loadData()
    },

    methods: {
        async loadData() {
            await axios.get('http://localhost:3000/historicData').then(resp => {this.assetHistory = resp.data})

            this.series[0].data = []

            for (let i = 0; i < this.assetHistory.length; i++) {
                let data = {
                    x: this.assetHistory[i].date,
                    y: this.assetHistory[i].totalValue,
                }

                this.series[0].data.push(data)
            }
        }
    },
}
</script>