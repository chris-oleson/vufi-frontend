<template>
    <v-app>
        <v-app-bar app clipped-left elevation="4">
            <v-btn v-if="$store.state.userID && ($route.path === '/assets' || $route.path === '/debts' || $route.path === '/net-worth')" plain icon class="mr-2" @click="mini = !mini">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-img src="./assets/logo64x64.png" max-height="50" max-width="50" class="link" @click="logoClicked"></v-img>
            <h2 class="font-weight-light pl-2 d-none d-sm-flex link" @click="logoClicked">VuFi</h2>
            
            <v-spacer></v-spacer>

            <v-btn v-if="$route.path == '/'" text tile class="font-weight-light" @click="redirect('/')">Home</v-btn>
            <v-btn v-if="$route.path == '/'" text tile class="font-weight-light mx-4" @click="redirect('/pricing')">Pricing</v-btn>
            <v-btn v-if="$route.path == '/'" text tile class="font-weight-light" @click="redirect('/about')">About</v-btn>
            <v-divider v-if="$route.path == '/'" vertical inset class="mx-4"></v-divider>

            <v-btn v-if="!$store.state.userID && $route.path == '/'" text tile class="font-weight-light" @click="redirect('/login')">Log In</v-btn>
            <v-btn v-if="!$store.state.userID && $route.path == '/'" tile class="primary ml-4" @click="redirect('/signup')">Sign Up</v-btn>
            <AccountMenu v-if="$store.state.userID"/>
        </v-app-bar>

        <NavMenu v-if="$store.state.userID && ($route.path === '/assets' || $route.path === '/debts' || $route.path === '/net-worth')" :mini="mini"/>

        <v-main>
            <router-view></router-view>
            <v-snackbar v-model="showNotification" top :color="notificationColor" transition="slide-y-transition" min-width="0" timeout="2000">{{notificationText}}</v-snackbar>
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
        }
    },

    created() {
        this.applyTheme()
    },

    methods: {
        redirect(link) { this.$router.push(link) },

        logoClicked() {
            if (this.$store.state.userID) {
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
};
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
</style>