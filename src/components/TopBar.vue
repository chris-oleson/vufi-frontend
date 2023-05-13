<template>
    <v-app-bar app clipped-left elevation="4">
        <v-img src="../assets/logo64x64.png" max-height="50" max-width="50" class="link" @click="logoClicked"></v-img>
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
</template>

<script>
import AccountMenu from '/src/components/AccountMenu'
export default {
    name: 'About',
    components: {
        AccountMenu
    },
    
    data() {
        return {
            selection: null
        }
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
    }
}
</script>