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

        allAssets: [],
        allHistory: [],

        totalPositiveAssets: 0,
        totalNegativeAssets: 0,
    },

    getters: {

    },

    mutations: {
        logIn(state, data) {
            state.userPrefs.theme = data.theme,
            state.userPrefs.currency = data.currency

            state.isLoggedIn = true
        },

        setUserPrefs(state, data) { state.userPrefs = data },

        logOut(state) {
            state.isLoggedIn = false

            state.userPrefs = {
                theme: 0,
                currency: 'USD'
            }

            state.allAssets.length = 0
            state.allHistory.length = 0
        },

        setNotification(state, data) { state.notification = data },

        setAllAssets(state, data) {
            state.allAssets = data
        },

        setAllHistory(state, data) {
            state.allHistory = data
        },

        setTotalPositiveAssets(state, data) {
            state.totalPositiveAssets = data
        },

        setTotalNegativeAssets(state, data) {
            state.totalNegativeAssets = data
        },
    },

    actions: {

        async getAllAssetData() {
            // Get raw asset data
            axios.get(process.env.VUE_APP_URL + 'assets/').then(resp => {
                let allAssets = resp.data
                
                // Set total values
                if (allAssets.length) {
                    let totalPositiveAssets = 0
                    let totalNegativeAssets = 0

                    for (let asset of allAssets) {
                        if (!asset.is_deleted) {
                            if (asset.is_debt) {
                                totalNegativeAssets += parseFloat(asset.value)
                            }
                            else {
                                totalPositiveAssets += parseFloat(asset.value)
                            }
                        }
                    }
                    
                    this.commit('setTotalPositiveAssets', totalPositiveAssets)
                    this.commit('setTotalNegativeAssets', totalNegativeAssets)
                    this.commit('setAllAssets', allAssets)
                }

                axios.get(process.env.VUE_APP_URL + 'assets/history/').then(resp => {
                    let allHistory = resp.data
                    this.commit('setAllHistory', allHistory)
                })
            })
            .catch((err) => {
                console.log(err.message)
            })
        },
    }
})