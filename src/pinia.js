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
        allHistory: [],

        totalPositiveAssets: 0,
        totalNegativeAssets: 0,
    }),

    actions: {
        logOut() {
            this.isLoggedIn = false
            this.allAssets = []
            this.allHistory = []
            this.totalPositiveAssets = 0
            this.totalNegativeAssets = 0
            this.theme = 0
            this.currency = 'USD'
        },

        async getAllAssetData() {
            // Get raw asset data
            axios.get('assets').then(resp => {
                let allAssets = resp.data
                let totalPositiveAssets = 0
                let totalNegativeAssets = 0

                // Set total values
                if (allAssets.length) {

                    // Calculate positive and negative asset totals
                    for (let asset of allAssets) {
                        if (!asset.is_deleted) {
                            if (asset.value < 0) {
                                totalNegativeAssets += parseFloat(asset.value)
                            }
                            else {
                                totalPositiveAssets += parseFloat(asset.value)
                            }
                        }
                    }
                }

                this.allAssets = allAssets
                this.totalPositiveAssets = totalPositiveAssets
                this.totalNegativeAssets = totalNegativeAssets

                axios.get('assets/history').then(resp => {
                    let allHistory = resp.data
                    this.allHistory = allHistory
                })
            })
            .catch((err) => {
                console.log(err.message)
            })
        },
    },
    persist: true,
})