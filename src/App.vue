<template>
    <v-app>
        <v-app-bar app clipped-left height="70" :hide-on-scroll="hideBar">
            <v-app-bar-nav-icon v-if="this.$store.state.userID && (this.$route.path === '/assets' || this.$route.path === '/debts' || this.$route.path === '/net-worth')" class="mr-4" @click="mini = !mini"></v-app-bar-nav-icon>
            <v-img src="./assets/logo64x64.png" max-height="50" max-width="50"></v-img>
            <h1 class="font-weight-light ml-2 d-none d-sm-flex">VuFi</h1>

            <v-spacer></v-spacer>

            <v-btn v-if="!this.$store.state.userID && this.$route.path == '/'" text @click="redirect('/login')">Log In</v-btn>
            <v-btn v-if="!this.$store.state.userID && this.$route.path == '/'" outlined class="ml-4" @click="redirect('/signup')">Sign Up</v-btn>
            <AccountMenu v-if="this.$store.state.userID"/>
        </v-app-bar>

        <!-- Sidebar navigation -->
        <NavMenu v-if="this.$store.state.userID && (this.$route.path === '/assets' || this.$route.path === '/debts' || this.$route.path === '/net-worth')" :mini="mini"/>

        <v-main>
            <router-view></router-view>
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
            mini: this.$vuetify.breakpoint.mobile
        }
    },

    created() {
        // Check user prefs for dark mode
        if (this.$store.state.settings.darkMode === 0) {
            this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        else if (this.$store.state.settings.darkMode === 1){
            this.$vuetify.theme.dark = false
        }
        else if (this.$store.state.settings.darkMode === 2){
            this.$vuetify.theme.dark = true
        }
    },

    computed: {
        hideBar() {
            if (this.$route.path === '/') {
                return true
            }
            else {
                return false
            }
        }
    },

    methods: {
        redirect(link) { this.$router.push(link) },
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

/* Preventing changes to button color when focused */
.v-btn:focus::before {
    opacity: 0 !important
}

/* Adds class for non-caps buttons */
.normal {
    text-transform: unset !important;
}
</style>