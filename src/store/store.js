import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [new VuexPersistence({
        storage: window.sessionStorage
    }).plugin],

    state: {
        isLoggedIn: false,

        userPrefs: {
            theme: 0,
            currency: 'USD'
        },

        notification: {
            text: '',
            color: ''
        },

        assets: {
            raw: [],
            totalValue: null,
            tableData: [],
            pieChartValues: [],
            pieChartLabels: [],
            history: [],
        },

        debts: {
            raw: [],
            totalValue: null,
            tableData: [],
            pieChartValues: [],
            pieChartLabels: [],
            history: [],
        },
    },

    getters: {

    },

    mutations: {
        login(state) {
            state.isLoggedIn = true
        },

        setUserPrefs(state, data) { state.userPrefs = data },

        logOut(state) {
            state.isLoggedIn = false

            state.userPrefs = {
                theme: 0,
                currency: 'USD'
            }
        },

        setNotification(state, data) { state.notification = data },

        setAssetData(state, assets) {
            state.assets.raw = assets.raw
            state.assets.totalValue = assets.totalValue
            state.assets.tableData = assets.tableData
            state.assets.pieChartValues = assets.pieChartValues
            state.assets.pieChartLabels = assets.pieChartLabels
            state.assets.history = assets.history
        },

        setDebtData(state, debts) {
            state.debts.raw = debts.raw
            state.debts.totalValue = debts.totalValue
            state.debts.tableData = debts.tableData
            state.debts.pieChartValues = debts.pieChartValues
            state.debts.pieChartLabels = debts.pieChartLabels
            state.debts.history = debts.history
        },
    },

    actions: {
        async getAssetData() {
            // Set up object we want to return
            let assets = {
                raw: [],
                totalValue: 0,
                tableData: [],
                pieChartValues: [],
                pieChartLabels: [],
                history: [],
            }

            // Get raw asset data
            axios.get(`http://localhost:3000/api/assets`)
            .then(resp => {
                assets.raw = resp.data
                
                // Set total value and pie chart data
                if (assets.raw.length) {
                    for (let asset of assets.raw) {
                        if (!asset.is_deleted) {
                            assets.pieChartLabels.push(asset.name)
                            assets.pieChartValues.push(parseFloat(asset.value))
                            assets.totalValue += parseFloat(asset.value)
                        }
                    }
                }

                // Filter out deleted assets in the table
                assets.tableData = assets.raw.filter(e => e.is_deleted == 0)

                axios.get(`http://localhost:3000/api/assets/history`)
                .then(resp => {
                    let rawHistory = resp.data

                    // Get all individual assets
                    let assetList = []
                    for (let asset of assets.raw) {
                        assetList.push({
                            id: asset.id,
                            history: []
                        })
                    }

                    // Get all dates that there are records for
                    let uniqueDates = []
                    for (let entry of rawHistory) {
                        if (!uniqueDates.includes(entry.date)) {
                            uniqueDates.push(entry.date)
                        }
                    }
                    uniqueDates = uniqueDates.sort()

                    // Go through every asset
                    for (let asset of assetList) {
                        for (let date of uniqueDates) {                    
                            // Check if there is any value for that asset on that date, add it if there is.
                            for (let entry of rawHistory) {
                                if (entry.date == date && entry.asset_id == asset.id) {
                                    asset.history.push({
                                        x: entry.date,
                                        y: parseFloat(entry.value)
                                    })
                                }
                            }
                            // If the asset doesn't have an entry for a date with data, add one with the previous value.
                            if (!asset.history.some(e => e.x == date)) {
                                if (asset.history.length) {
                                    asset.history.push({
                                        x: date,
                                        y: parseFloat(asset.history[asset.history.length - 1].y)
                                    })
                                }
                            }
                        }
                    }

                    // Turn the asset data into something the line chart can read
                    for (let asset of assetList) {
                        for (let entry of asset.history) {
                            let i = assets.history.findIndex(e => e.x == entry.x)
                            if (i < 0) {
                                assets.history.push(entry)
                            }
                            else {
                                assets.history[i].y += entry.y
                            }
                        }
                    }

                    this.commit('setAssetData', assets)
                })
            })
            .catch(() => {
                this.$router.push('/404')
            })
        },

        async getDebtData() {
            // Set up object we want to return
            let debts = {
                totalValue: 0,
                tableData: [],
                pieChartValues: [],
                pieChartLabels: [],
                history: [],
            }

            // Get raw asset data
            axios.get(`http://localhost:3000/api/debts`)
            .then(resp => {
                debts.raw = resp.data
                
                // Set total value and pie chart data
                if (debts.raw.length) {
                    for (let debt of debts.raw) {
                        if (!debt.is_deleted) {
                            debts.pieChartLabels.push(debt.name)
                            debts.pieChartValues.push(parseFloat(debt.value))
                            debts.totalValue += parseFloat(debt.value)
                        }
                    }
                }

                // Filter out deleted assets in the table
                debts.tableData = debts.raw.filter(e => e.is_deleted == 0)

                axios.get(`http://localhost:3000/api/debts/history`)
                .then(resp => {
                    debts.history = resp.data

                    this.commit('setDebtData', debts)
                })
            })
            .catch(() => {
                this.$router.push('/404')
            })
        },
    }
})