import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

export default createVuetify({
    components: {
        ...components,
        ...labsComponents,
    },
    directives,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#83af50',
                    accent: '#aed581',
                    secondary: '#ffffff',
                    success: '#83af50',
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
                    error: '#c13e3e',
                }
            },
        },
    },
})