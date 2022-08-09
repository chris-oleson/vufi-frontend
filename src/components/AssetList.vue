<template>
    <div class="ml-8 mb-8">
        <h2 class="mb-4 mt-8 font-weight-light text-center">Assets and Liabilites</h2>

        <Asset v-for="(assetData, i) in assetsData" :key="i" :assetData="assetsData[i]"/>

        <h2 class="d-flex justify-center">
            <AddButton/>
        </h2>

        <v-snackbar v-model="showAlert" color="red lighten-2" timeout="2000" min-width="100">Please fill out all fields</v-snackbar>
    </div>
</template>

<script>
import AddButton from '/src/components/AddButton.vue'
import Asset from '/src/components/Asset.vue'
import axios from 'axios'

export default {
    name: 'AssetList',
    components: {
        AddButton,
        Asset
    },

    data() {
        return {
            assetsData: [],
            showAlert: false,
        }
    },

    mounted() {
        this.getAssetData()
    },

    methods: {
        async getAssetData() {
            await axios.get('http://localhost:3000/assets').then(resp => {this.assetsData = resp.data})
        },

        async updateChartData() {
            let today = new Date().toString().substr(4, 11)

            let totalValue = 0

            for (let i = 0; i < this.assetsData.length; i++) {
                totalValue += this.assetsData[i].value
            }

            await axios.get('http://localhost:3000/historicData').then(resp => {
                let chartData = resp.data

                if (chartData.length) {
                    if (chartData[chartData.length - 1].date == today) {

                        axios.patch('http://localhost:3000/historicData/' + chartData[chartData.length - 1].id,
                            {
                                "date": today,
                                "totalValue": totalValue,
                            }
                        )

                        return
                    }
                }

                axios.post('http://localhost:3000/historicData',
                    {
                        "date": today,
                        "totalValue": totalValue,
                    }
                )
            })
        }
    }
}
</script>