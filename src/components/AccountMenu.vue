<template>
    <div>
        <v-menu offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab small v-bind="attrs" v-on="on">
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </template>
            <v-list class="font-weight-light" width="200">
                <v-list-item>
                    <v-list-item-title>{{this.$store.state.userID}}</v-list-item-title>
                </v-list-item>

                <v-list-item-group>
                    <v-divider></v-divider>
                    <v-list-item @click="redirect('/settings')">Settings</v-list-item>
                    <v-list-item @click="logOut">Log out</v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    name: 'AccountMenu',

    methods: {
        logOut() {
            this.$store.commit('logOut')
            this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            this.$router.push('/')
        },

        redirect(link) { this.$router.push(link) },
    },
}
</script>