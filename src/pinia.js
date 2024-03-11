import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('store', {
    state: () => ({
        name: '',
        isLoggedIn: false,
        subscriptionStatus: 'Free',
        reauthenticate: false,
        theme: 0,
        currency: 'USD',
        currencyRates: {},
        privacy: false,

        notification: {
            text: '',
            color: ''
        },

        allItems: [],
        allItemHistory: [],
        totalAssetValue: 0,
        totalDebtValue: 0,
    }),

    actions: {
        async getAllAssetData() {
            let [
                itemResponse,
                itemHistoryResponse,
                currencyValueResponse,
            ] = await Promise.all([
                axios.get('/items'),
                axios.get('/items/history'),
                axios.get('/currencies/rates'),
            ])

            this.allItems = itemResponse.data
            this.allItemHistory = itemHistoryResponse.data
            this.currencyRates = currencyValueResponse.data

            this.totalAssetValue = 0
            this.totalDebtValue = 0
            for (let item of this.allItems) {
                if (!item.is_deleted && !item.is_hidden) {
                    if (item.type == "asset") {
                        this.totalAssetValue += parseFloat(item.value)
                    }
                    else {
                        this.totalDebtValue -= parseFloat(item.value)
                    }
                }
            }
        }
    },
    persist: true,
})