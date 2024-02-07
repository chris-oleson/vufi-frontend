import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
    defaults: {
        global: {
          ripple: false,
        },
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#83af50',
                    background: '#e8e8e8',
                    accent: '#aed581',
                    secondary: '#ffffff',
                    success: '#83af50',
                    warning: '#ff8c19',
                    error: '#c13e3e',
                }
            },
            dark: {
                dark: true,
                colors: {
                    primary: '#83af50',
                    accent: '#3d4b2f',
                    secondary: '#272727',
                    success: '#83af50',
                    warning: '#ff8c19',
                    error: '#c13e3e',
                }
            },
        },
    },
})