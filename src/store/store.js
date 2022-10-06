import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [new VuexPersistence({
        storage: window.sessionStorage
    }).plugin],

    state: {
        notification: {
            text: '',
            color: ''
        },

        totalAssetValue: null,
        totalDebtValue: null,
    },

    getters: {

    },

    setters: {

    },

    mutations: {
        setUserID(state, data) { state.userID = data },
        setFirstName(state, data) { state.firstName = data },

        setUserPrefs(state, data) { state.userPrefs = data },

        logOut(state) {
            state.userID = null,
            state.userFirstName = null,
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