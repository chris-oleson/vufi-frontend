<template>
    <v-app>
        <TopBar/>

        <SideBar/>

        <v-main>
            <router-view/>
            <v-snackbar v-model="showNotification" :color="notificationColor" app transition="slide-y-transition" class="pa-0" content-class="text-center ml-2" timeout="2000">{{ notificationText }}</v-snackbar>
        </v-main>
    </v-app>
</template>

<script>
import TopBar from '/src/components/TopBar'
import SideBar from '/src/components/SideBar'

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
        redirect(link) {
            if (this.$route.path != link) {
                this.$router.push(link)
            }
        },

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
            this.$axios.get('auth/checkSession')
            .catch(() => {
                this.$axios.post('auth/logout').then(() => {
                    this.$store.commit('logOut')
                    this.redirect('/login')
                })
            })
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
    background: #aed581
}
::-moz-selection {
    background: #aed581
}

/* Turning the logo into a button */
.link:hover {
    cursor: pointer
}

/* Disable ripple effect */
.v-ripple__container {
  opacity: 0 !important;
}
</style>