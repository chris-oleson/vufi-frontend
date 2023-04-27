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
            totalValue: null,
            tableData: [],
            pieChartValues: [],
            pieChartLabels: [],
            history: [],
        },

        debts: {
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

            state.totalAssetValue = null,
            state.totalDebtValue = null
        },

        setNotification(state, data) { state.notification = data },

        setAssetData(state, assets) {
            state.assets.totalValue = assets.totalValue
            state.assets.tableData = assets.tableData
            state.assets.pieChartValues = assets.pieChartValues
            state.assets.pieChartLabels = assets.pieChartLabels
            state.assets.history = assets.history
        },

        setDebtData(state, debts) {
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
                totalValue: 0,
                tableData: [],
                pieChartValues: [],
                pieChartLabels: [],
                history: [],
            }

            // Get raw asset data
            axios.get(`http://localhost:3000/api/assets`)
            .then(resp => {
                let assetData = resp.data
                
                // Set total value and pie chart data
                if (assetData.length) {
                    for (let asset of assetData) {
                        if (!asset.is_deleted) {
                            assets.pieChartLabels.push(asset.name)
                            assets.pieChartValues.push(parseFloat(asset.value))
                            assets.totalValue += parseFloat(asset.value)
                        }
                    }
                }

                // Filter out deleted assets in the table
                assets.tableData = assetData.filter(e => e.is_deleted == 0)

                axios.get(`http://localhost:3000/api/assets/history`)
                .then(resp => {
                    assets.history = resp.data
                })

                this.commit('setAssetData', assets)
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
                let debtData = resp.data
                
                // Set total value and pie chart data
                if (debtData.length) {
                    for (let debt of debtData) {
                        if (!debt.is_deleted) {
                            debts.pieChartLabels.push(debt.name)
                            debts.pieChartValues.push(parseFloat(debt.value))
                            debts.totalValue += parseFloat(debt.value)
                        }
                    }
                }

                // Filter out deleted assets in the table
                debts.tableData = debtData.filter(e => e.is_deleted == 0)

                axios.get(`http://localhost:3000/api/debts/history`)
                .then(resp => {
                    debts.history = resp.data
                })

                this.commit('setDebtData', debts)
            })
            .catch(() => {
                this.$router.push('/404')
            })
        },
    }
})