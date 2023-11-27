import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('store', {
    state: () => ({
        isLoggedIn: false,
        subscriptionStatus: null,
        theme: 0,
        currency: 'USD',

        notification: {
            text: '',
            color: ''
        },

        allAssets: [],
        allDebts: [],

        allAssetHistory: [],
        allDebtHistory: [],

        totalPositiveAssets: 0,
        totalNegativeAssets: 0,
    }),

    actions: {
        getAllAssetData() {
            // Get raw asset data
            axios.get('assets').then(resp => {
                let items = resp.data
                let allAssets = []
                let allDebts = []
                let totalPositiveAssets = 0
                let totalNegativeAssets = 0

                // Set total values
                for (let i = 0; i < items.length; i++) {
                    if (!items[i].is_deleted && items[i].value >= 0) {
                        items[i].visible = true
                        allAssets.push(items[i])
                        totalPositiveAssets += parseFloat(items[i].value)
                    }
                    else if (!items[i].is_deleted) {
                        items[i].visible = true
                        allDebts.push(items[i])
                        totalNegativeAssets += parseFloat(items[i].value)
                    }
                }
                this.allAssets = allAssets
                this.allDebts = allDebts
                this.totalPositiveAssets = totalPositiveAssets
                this.totalNegativeAssets = totalNegativeAssets
            })

            axios.get('assets/history').then(resp => {
                let history = resp.data
                let allAssetHistory = []
                let allDebtHistory = []

                for (let i = 0; i < history.length; i++) {
                    if (history[i].value >= 0) {
                        allAssetHistory.push(history[i])
                    }
                    else {
                        allDebtHistory.push(history[i])
                    }
                }

                this.allAssetHistory = allAssetHistory
                this.allDebtHistory = allDebtHistory
            })
        }
    },
    persist: true,
})