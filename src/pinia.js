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
    }),

    getters: {
        totalAssetValue: (state) => {
            let total = 0
            for (let item of state.allItems) {
                if (!item.is_deleted && !item.hidden && item.type == "asset") {
                    total += parseFloat(item.value)
                }
            }
            return total
        },
        totalDebtValue: (state) => {
            let total = 0
            for (let item of state.allItems) {
                if (!item.is_deleted && !item.hidden && item.type == "debt") {
                    total -= parseFloat(item.value)
                }
            }
            return total
        },
    },

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
        }
    },
    
    persist: true,
})