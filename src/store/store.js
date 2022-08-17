import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [new VuexPersistence({}).plugin],

    state: {
        currentUser: {},
        assetData: [],
        historicData: [],
        userData: [],
    },

    getters: {

    },

    setters: {

    },

    mutations: {
        setCurrentUser(state, data) { state.currentUser = data },

        setAssets(state, data) { state.assetData = data },

        setHistory(state, data) { state.historicData = data },

        setUsers(state, data) { state.userData = data },
    },

    actions: {
        async LOAD_ASSETS() {
            await axios.get('http://localhost:3000/assets').then(resp => {
                this.commit('setAssets', resp.data)
            })
        },

        async ADD_ASSET(context, asset) {
            await axios.post('http://localhost:3000/assets', asset)
        },

        async SAVE_ASSET(context, asset) {
            await axios.patch('http://localhost:3000/assets/' + asset.id, asset.data)
            await this.dispatch('LOAD_ASSETS')
            await this.dispatch('LOAD_HISTORY')
            await this.dispatch('SAVE_HISTORY')
        },

        async DELETE_ASSET(context, id) {
            await axios.delete('http://localhost:3000/assets/' + id)
            await this.dispatch('LOAD_ASSETS')
            await this.dispatch('LOAD_HISTORY')
            await this.dispatch('SAVE_HISTORY')
        },

        async LOAD_HISTORY() {
            await axios.get('http://localhost:3000/historicData/').then(resp => {
                this.commit('setHistory', resp.data)
            })
        },

        async SAVE_HISTORY() {
            let lastEntry = this.state.historicData[this.state.historicData.length - 1]
            let today = new Date().toString().substring(4, 15)
            let totalValue = 0
            for (let i = 0; i < this.state.assetData.length; i++) {
                totalValue += this.state.assetData[i].value
            }
            
            let data = {
                x: today,
                y: totalValue
            }

            if (lastEntry.x == today) {
                await axios.patch('http://localhost:3000/historicData/' + lastEntry.id, data)
            }
            else {
                await axios.post('http://localhost:3000/historicData', data)
            }

            await this.dispatch('LOAD_HISTORY')
        },

        async LOAD_USERS() {
            await axios.get('http://localhost:3000/users/').then(resp => {
                this.commit('setUsers', resp.data)
            })
        },

        async ADD_USER(context, user) {
            await axios.post('http://localhost:3000/users', user)
        },
    }
})