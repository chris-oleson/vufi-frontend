<template>
    <div>
        <v-menu offset-y close-on-click transition="slide-y-transition" nudge-bottom='10'>
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab small v-bind="attrs" v-on="on">
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </template>
            <v-list>
                <h3 class="font-weight-light text-center ma-4">Welcome, {{this.$store.state.currentUser.firstName}}</h3>
                <div class="d-flex justify-center ma-4">
                    <v-btn v-if="this.$store.state.currentUser.email" text @click="logOut">Log out</v-btn>
                </div>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    name: 'AccountMenu',

    data() {
        return {

        }
    },

    methods: {
        logOut() {
            this.$store.commit('setCurrentUser', {})
            this.$router.push('/')
        }
    }
}
</script>