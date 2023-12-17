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
        totalAssetValue: 0,
        allAssetHistory: [],
        allDebts: [],
        totalDebtValue: 0,
        allDebtHistory: [],
    }),

    actions: {
        async getAllAssetData() {
            // Get raw asset data
            let [
                assetResponse,
                assetValueResponse,
                assetHistoryResponse,
                debtResponse,
                debtValueResponse,
                debtHistoryResponse
            ] = await Promise.all([
                axios.get('/assets'),
                axios.get('/assets/value'),
                axios.get('/assets/history'),
                axios.get('/debts'),
                axios.get('/debts/value'),
                axios.get('/debts/history'),
            ])

            this.allAssets = assetResponse.data
            this.totalAssetValue = assetValueResponse.data
            this.allAssetHistory = assetHistoryResponse.data
            this.allDebts = debtResponse.data
            this.totalDebtValue = debtValueResponse.data
            this.allDebtHistory = debtHistoryResponse.data
        }
    },
    persist: true,
})