<template>
    <v-app :theme=getTheme>
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
        if (this.$store.state.isLoggedIn) {
            this.$axios.get('auth/checkSession')
            .catch(() => {
                this.$axios.post('auth/logout').then(() => {
                    this.$store.commit('logOut')
                    this.redirect('/login')
                })
            })
        }
    },

    computed: {
        getTheme() {
            if (this.$store.state.userPrefs.theme === 1) {
                return 'light'
            }
            else if (this.$store.state.userPrefs.theme === 2) {
                return 'dark'
            }
            else {
                return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            }
        }
    },

    methods: {
        redirect(link) {
            if (this.$route.path != link) {
                this.$router.push(link)
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

        '$store.state.notification'(data) {
            this.notificationText = data.text
            this.notificationColor = data.color
            this.showNotification = true
        },

        '$store.state.userPrefs.theme'(data) {
            if (data === 0) {
                this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            }
            else if (data === 1){
                this.$vuetify.theme.dark = false
            }
            else if (data === 2){
                this.$vuetify.theme.dark = true
            }
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