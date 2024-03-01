import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('store', {
    state: () => ({
        isLoggedIn: false,
        subscriptionStatus: 'Free',
        theme: 0,
        currency: 'USD',
        privacy: 'false',

        notification: {
            text: '',
            color: ''
        },

        allAssets: [],
        totalAssetValue: 0,
        allAssetHistory: [],
        allDebts: [],
        totalDebtValue: 0,
        allDebtHistory: [],
    }),

    actions: {
        async getAllAssetData() {
            let [
                assetResponse,
                assetHistoryResponse,
                debtResponse,
                debtHistoryResponse
            ] = await Promise.all([
                axios.get('/assets'),
                axios.get('/assets/history'),
                axios.get('/debts'),
                axios.get('/debts/history'),
            ])

            this.allAssets = assetResponse.data
            this.allAssetHistory = assetHistoryResponse.data
            this.allDebts = debtResponse.data
            this.allDebtHistory = debtHistoryResponse.data

            this.totalAssetValue = 0
            for (let asset of this.allAssets) {
                if (!asset.is_deleted && !asset.is_hidden) {
                    this.totalAssetValue += parseFloat(asset.value)
                }
            }

            this.totalDebtValue = 0
            for (let debt of this.allDebts) {
                if (!debt.is_deleted && !debt.is_hidden) {
                    this.totalDebtValue += parseFloat(debt.value)
                }
            }
        }
    },
    persist: true,
})