import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [new VuexPersistence({}).plugin],

    state: {
        userID: null,
        userPrefs: {
            theme: 0,
            currency: 'USD',
        },
        assets: [],
        debts: [],
    },

    getters: {

    },

    setters: {

    },

    mutations: {
        setUserID(state, data) { state.userID = data },

        setUserPrefs(state, data) { state.userPrefs = data },

        setAssets(state, data) { state.assets = data },
        setDebts(state, data) { state.debts = data },
    },

    actions: {
        
    }
})