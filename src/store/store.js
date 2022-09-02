import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [new VuexPersistence({}).plugin],

    state: {
        userID: null,
        settings: {
            theme: null,
            currency: null,
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

        setTheme(state, data) { state.settings.theme = data },
        setCurrency(state, data) { state.settings.currency = data },

        setAssets(state, data) { state.assets = data },
        setDebts(state, data) { state.debts = data },
    },

    actions: {
        
    }
})