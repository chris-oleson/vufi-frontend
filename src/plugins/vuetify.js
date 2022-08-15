import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#aed581',
                secondary: '#aed581',
                accent: '#aed581',
                error: '#e57373',
            },
            dark: {
                primary: '#aed581',
                secondary: '#aed581',
                accent: '#aed581',
                error: '#e57373',

                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
            },
        },
    },
})