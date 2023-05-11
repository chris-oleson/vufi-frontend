import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#aed581',
                secondary: '#ffffff',
                accent: '#aed581',
                success: '#aed581',
                error: '#e57373',
            },
            dark: {
                primary: '#aed581',
                secondary: '#272727',
                accent: '#aed581',
                success: '#aed581',
                error: '#e57373',
            },
        },
    },
})