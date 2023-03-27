import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#556b2f',
                secondary: '#ffffff',
                accent: '#556b2f',
                error: '#e57373',
            },
            dark: {
                primary: '#556b2f',
                secondary: '#272727',
                accent: '#556b2f',
                error: '#e57373',
            },
        },
    },
})