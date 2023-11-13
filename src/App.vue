<template>
    <v-app>
        <TopBar/>
        <SideBar v-if="usingApp"/>
        <v-main>
            <router-view/>
            <v-snackbar v-model="showNotification" :color="notificationColor" app transition="slide-y-transition" class="pa-0" content-class="text-center ml-2" timeout="2000">{{ notificationText }}</v-snackbar>
        </v-main>
    </v-app>
</template>

<script>
import TopBar from '/src/components/TopBar.vue'
import SideBar from '/src/components/SideBar.vue'

export default {
    name: 'App',

    components: {
        TopBar,
        SideBar
    },

    data() {
        return {
            showNotification: false,
            notificationColor: '',
            notificationText: '',
        }
    },

    created() {
        this.setTheme()
        this.checkSession()
    },

    methods: {
        setTheme() {
            if (this.$store.state.userPrefs.theme == 1) {
                this.$vuetify.theme.global.name = 'light'
            }
            else if (this.$store.state.userPrefs.theme == 2) {
                this.$vuetify.theme.global.name = 'dark'
            }
            else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.$vuetify.theme.global.name = 'dark'
            }
            else {
                this.$vuetify.theme.global.name = 'light'
            }
        },

        checkSession() {
            if (this.$store.state.isLoggedIn) {
                this.$axios.get('auth/check-session')
                .catch(() => {
                    this.$axios.post('auth/logout').then(() => {
                        this.$store.commit('logOut')
                        this.$router.push('/')
                    })
                })
            }
        }
    },

    computed: {
        usingApp() {
            if (this.$route.path == '/assets' || this.$route.path == '/debts' || this.$route.path == '/net-worth') {
                return true
            }
            else {
                return false
            }
        }
    },

    watch: {
        // Update tab text when the page changes
        $route: {
            handler(newRoute) {
                document.title = newRoute.meta.title;
            }
        },

        // Notification data
        '$store.state.notification'(data) {
            this.notificationText = data.text
            this.notificationColor = data.color
            this.showNotification = true
        },

        '$store.state.userPrefs.theme'() {
            this.setTheme()
        }
    }
}
</script>

<style>
/* Text selection color */
::selection {
    background: #83af50
}
::-moz-selection {
    background: #83af50
}

/* Removing default link styling */
a {
    color: inherit;
    text-decoration: inherit;
}
</style>