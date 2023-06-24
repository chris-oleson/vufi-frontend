<template>
    <v-app-bar>
        <v-img src="../assets/logo.svg" max-width="50" max-height="50" class="link ml-4" @click="$router.push('/')"/>
        <h2 class="font-weight-light link px-2" @click="$router.push('/')">VuFi</h2>
        
        <v-spacer/>

        <template v-if="!$vuetify.display.xs && !usingApp">
            <v-btn rounded="0" class="font-weight-light" @click="$router.push('/')">Home</v-btn>
            <v-btn rounded="0" class="font-weight-light mx-4" @click="$router.push('/pricing')">Pricing</v-btn>
            <v-btn rounded="0" class="font-weight-light" @click="$router.push('/about')">About</v-btn>
            <v-divider vertical inset class="mx-4"></v-divider>
            <v-btn v-if="$store.state.isLoggedIn" rounded="0" class="font-weight-light" @click="$router.push('/assets')">Dashboard</v-btn>
            <v-btn v-if="!$store.state.isLoggedIn" rounded="0" class="font-weight-light" @click="$router.push('/login')">Log In</v-btn>
            <v-btn v-if="!$store.state.isLoggedIn" rounded="0" class="bg-primary mx-4" @click="$router.push('/signup')">Sign Up</v-btn>
        </template>

        <v-menu v-if="$vuetify.display.xs && !usingApp" offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-menu" class="mr-1" variant="plain" size="large" v-bind="props"/>
            </template>
            
            <v-list class="font-weight-light" width="200">
                <v-list-item rounded="0" class="font-weight-light" @click="$router.push('/')">Home</v-list-item>
                <v-list-item rounded="0" class="font-weight-light" @click="$router.push('/pricing')">Pricing</v-list-item>
                <v-list-item rounded="0" class="font-weight-light" @click="$router.push('/about')">About</v-list-item>
                <v-divider class="mx-2"></v-divider>
                <v-list-item v-if="$store.state.isLoggedIn" class="font-weight-light" @click="$router.push('/assets')">Dashboard</v-list-item>
                <v-list-item v-if="!$store.state.isLoggedIn" class="font-weight-light" @click="$router.push('/login')">Log In</v-list-item>
                <v-list-item v-if="!$store.state.isLoggedIn" class="font-weight-light text-primary" @click="$router.push('/signup')">Sign Up</v-list-item>
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

    computed: {
        usingApp() {
            if (this.$route.path == '/assets' || this.$route.path == '/debts' || this.$route.path == '/net-worth') {
                return true
            }
            return false
        }
    }
}
</script>