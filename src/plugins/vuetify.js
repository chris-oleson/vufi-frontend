import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#83af50',
                accent: '#aed581',
                secondary: '#ffffff',
                success: '#83af50',
                error: '#c13e3e',
            },
            dark: {
                primary: '#83af50',
                accent: '#3c5125',
                secondary: '#272727',
                success: '#83af50',
                error: '#c13e3e',
            },
        },
    },
})