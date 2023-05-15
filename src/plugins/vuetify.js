import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#aed581',
                secondary: '#ffffff',
                success: '#aed581',
                error: '#e57373',
            },
            dark: {
                primary: '#83af50',
                secondary: '#272727',
                success: '#83af50',
                error: '#c13e3e',
            },
        },
    },
})