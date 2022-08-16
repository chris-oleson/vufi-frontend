<template>
    <v-app>
        <v-app-bar app>
            <v-img src="./assets/logo64x64.png" max-height="50" max-width="50" class="mr-4"></v-img>
            <h1 class="font-weight-light d-none d-sm-flex">VuFi</h1>
            <v-spacer></v-spacer>
            <v-btn v-if="!this.$store.state.currentUser.email && this.$route.meta.title == 'Home'" text @click="redirect('/login')">Log In</v-btn>
            <v-btn v-if="!this.$store.state.currentUser.email && this.$route.meta.title == 'Home'" class="ml-4 primary" @click="redirect('/create-account')">Sign Up</v-btn>
            <AccountMenu v-if="this.$store.state.currentUser.email"/>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import AccountMenu from './components/AccountMenu'
export default {
    name: 'App',

    components: {
        AccountMenu
    },

    mounted() {
        // Check user prefs for dark mode
        this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },

    methods: {
        redirect(link) { this.$router.push(link) },
    },

    watch: {
        // Update tab text when the page changes
        $route: {
            immediate: true,
            handler(newRoute) {
                document.title = newRoute.meta.title + ' | VuFi';
            }
        },
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
</style>