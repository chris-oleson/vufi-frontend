<template>
    <v-app>
        <v-app-bar app clipped-left elevation="4">
            <v-img src="./assets/logo64x64.png" max-height="50" max-width="50" class="link" @click="logoClicked"></v-img>
            <h2 class="font-weight-light pl-2 link" @click="logoClicked">VuFi</h2>
            
            <v-spacer></v-spacer>

            <template v-if="!this.$vuetify.breakpoint.xs && !usingApp">
                <v-btn text tile class="font-weight-light" @click="redirect('/')">Home</v-btn>
                <v-btn text tile class="font-weight-light mx-4" @click="redirect('/pricing')">Pricing</v-btn>
                <v-btn text tile class="font-weight-light" @click="redirect('/about')">About</v-btn>
                <v-divider vertical inset class="mx-4"></v-divider>
                <v-btn v-if="!$store.state.isLoggedIn" text tile class="font-weight-light" @click="redirect('/login')">Log In</v-btn>
                <v-btn v-if="!$store.state.isLoggedIn" tile class="primary ml-4" @click="redirect('/signup')">Sign Up</v-btn>
            </template>

            <v-menu v-if="this.$vuetify.breakpoint.xs && !usingApp" offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="mr-1" plain icon large v-bind="attrs" v-on="on" @click="selection = null">
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>
                </template>
                
                <v-list class="font-weight-light" width="200">
                    <v-list-item-group v-model="selection">
                        <v-list-item text tile class="font-weight-light" @click="redirect('/')">Home</v-list-item>
                        <v-list-item text tile class="font-weight-light" @click="redirect('/pricing')">Pricing</v-list-item>
                        <v-list-item text tile class="font-weight-light" @click="redirect('/about')">About</v-list-item>
                        <v-divider class="mx-2"></v-divider>
                        <v-list-item text tile class="font-weight-light" @click="redirect('/login')">Log In</v-list-item>
                        <v-list-item text tile class="font-weight-light primary--text" @click="redirect('/signup')">Sign Up</v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-menu>

            <AccountMenu v-if="$store.state.isLoggedIn"/>
        </v-app-bar>

        <NavMenu v-if="usingApp" :mini="mini"/>

        <v-main>
            <router-view></router-view>
            <v-snackbar v-model="showNotification" :color="notificationColor" app transition="slide-y-transition" class="pa-0" content-class="text-center ml-2" timeout="2000">{{notificationText}}</v-snackbar>
        </v-main>
    </v-app>
</template>

<script>
import AccountMenu from '/src/components/AccountMenu'
import NavMenu from '/src/components/NavMenu'

export default {
    name: 'App',

    components: {
        AccountMenu,
        NavMenu,
    },

    data() {
        return {
            mini: this.$vuetify.breakpoint.mobile,
            showNotification: false,
            notificationColor: '',
            notificationText: '',
            selection: null
        }
    },

    created() {
        this.applyTheme()
    },

    computed: {
        usingApp() {
            if (this.$route.path == '/assets' || this.$route.path == '/debts' || this.$route.path == '/net-worth') {
                return true
            }
            return false
        }
    },

    methods: {
        redirect(link) {
            if (this.$route.path != link) {
                this.$router.push(link)
            }
        },

        logoClicked() {
            if (this.$store.state.isLoggedIn) {
                this.redirect('/assets')
            }
            else {
                this.redirect('/')
            }
        },

        applyTheme() {
            if (this.$store.state.userPrefs.theme === 0) {
                this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            }
            else if (this.$store.state.userPrefs.theme === 1){
                this.$vuetify.theme.dark = false
            }
            else if (this.$store.state.userPrefs.theme === 2){
                this.$vuetify.theme.dark = true
            }
        },
    },

    watch: {
        // Update tab text when the page changes
        $route: {
            immediate: true,
            handler(newRoute) {
                document.title = newRoute.meta.title;
            }
        },

        '$vuetify.breakpoint.mobile'(data) {
            this.mini = data
        },

        '$store.state.notification'(data) {
            this.notificationText = data.text
            this.notificationColor = data.color
            this.showNotification = true
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