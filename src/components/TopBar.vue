<template>
    <v-app-bar elevation="4">
        <img :src="require('../assets/logo.svg')" width="50" height="50" class="link ml-4" @click="redirect('/')"/>
        <h2 class="font-weight-light link px-2" @click="redirect('/')">VuFi</h2>
        
        <v-spacer></v-spacer>

        <template v-if="!$vuetify.display.xs && !usingApp">
            <v-btn rounded="0" class="font-weight-light" @click="redirect('/')">Home</v-btn>
            <v-btn rounded="0" class="font-weight-light mx-4" @click="redirect('/pricing')">Pricing</v-btn>
            <v-btn rounded="0" class="font-weight-light" @click="redirect('/about')">About</v-btn>
            <v-divider vertical inset class="mx-4"></v-divider>
            <v-btn v-if="$store.state.isLoggedIn" rounded="0" class="font-weight-light" @click="redirect('/assets')">Dashboard</v-btn>
            <v-btn v-if="!$store.state.isLoggedIn" rounded="0" class="font-weight-light" @click="redirect('/login')">Log In</v-btn>
            <v-btn v-if="!$store.state.isLoggedIn" rounded="0" class="bg-primary ml-4" @click="redirect('/signup')">Sign Up</v-btn>
        </template>

        <v-menu v-if="$vuetify.display.xs && !usingApp" offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="mr-1" plain icon large v-bind="attrs" v-on="on">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </template>
            
            <v-list nav class="font-weight-light" width="200">
                <v-list-item text tile class="font-weight-light" @click="redirect('/')">Home</v-list-item>
                <v-list-item text tile class="font-weight-light" @click="redirect('/pricing')">Pricing</v-list-item>
                <v-list-item text tile class="font-weight-light" @click="redirect('/about')">About</v-list-item>
                <v-divider class="mx-2"></v-divider>
                <v-list-item v-if="$store.state.isLoggedIn" class="font-weight-light" @click="redirect('/assets')">Dashboard</v-list-item>
                <v-list-item v-if="!$store.state.isLoggedIn" class="font-weight-light" @click="redirect('/login')">Log In</v-list-item>
                <v-list-item v-if="!$store.state.isLoggedIn" class="font-weight-light text-primary" @click="redirect('/signup')">Sign Up</v-list-item>
            </v-list>
        </v-menu>

        <AccountMenu v-if="$store.state.isLoggedIn"/>
    </v-app-bar>
</template>

<script>
import AccountMenu from '/src/components/AccountMenu'
export default {
    name: 'TopBar',
    components: {
        AccountMenu
    },
    
    data() {
        return {

        }
    },

    computed: {
        usingApp() {
            if (this.$route == '/assets' || this.$route == '/debts' || this.$route == '/net-worth') {
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
    }
}
</script>