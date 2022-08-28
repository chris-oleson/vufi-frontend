<template>
    <v-app>
        <v-app-bar app clipped-left height="70">
            <v-app-bar-nav-icon v-if="!this.$vuetify.breakpoint.mobile && this.$store.state.userID" class="mr-4" @click="mini = !mini"></v-app-bar-nav-icon>
            <v-img src="./assets/logo64x64.png" max-height="50" max-width="50"></v-img>
            <h1 class="font-weight-light ml-2">VuFi</h1>

            <v-spacer></v-spacer>

            <v-btn v-if="!this.$store.state.userID && this.$route.meta.title == 'Home'" text @click="redirect('/login')">Log In</v-btn>
            <v-btn v-if="!this.$store.state.userID && this.$route.meta.title == 'Home'" class="ml-4 primary" @click="redirect('/create-account')">Create Account</v-btn>
            <AccountMenu v-if="this.$store.state.userID"/>
        </v-app-bar>

        <!-- Sidebar navigation -->
        <v-navigation-drawer v-if="this.$store.state.userID" app clipped permanent :mini-variant="mini">
            <v-list class="font-weight-light pa-0">
                <v-list-item-group mandatory v-bind:value="page">

                    <v-list-item @click="redirect('/assets')">
                        <v-list-item-icon class="mr-4">
                            <v-icon>mdi-cash-multiple</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Assets</v-list-item-title>
                        <v-list-item-subtitle class="text-right">$50,000</v-list-item-subtitle>
                    </v-list-item>
                    
                    <v-list-item @click="redirect('/debts')">
                        <v-list-item-icon class="mr-4">
                            <v-icon>mdi-credit-card-multiple</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Debts</v-list-item-title>
                        <v-list-item-subtitle class="text-right">-$10,000</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item @click="redirect('/net-worth')">
                        <v-list-item-icon class="mr-4">
                            <v-icon>mdi-sigma</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Net Worth</v-list-item-title>
                        <v-list-item-subtitle class="text-right">$40,000</v-list-item-subtitle>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

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

    data() {
        return {
            mini: this.$vuetify.breakpoint.mobile,
        }
    },

    mounted() {
        // Check user prefs for dark mode
        this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },

    computed: {
        page() {
            if (this.$route.meta.title == "Assets") {
                return 0
            }
            else if (this.$route.meta.title == "Debts") {
                return 1
            }
            else if (this.$route.meta.title == "Net Worth") {
                return 2
            }
            return 0
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