import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

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

        totalAssetValue: null,
        assetHistory: [],

        totalDebtValue: null,
        assetDebtHistory: [],
    },

    getters: {

    },

    setters: {

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

        setTotalAssetValue(state, data) { state.totalAssetValue = data },
        setTotalDebtValue(state, data) { state.totalDebtValue = data },
    },

    actions: {
        
    }
})