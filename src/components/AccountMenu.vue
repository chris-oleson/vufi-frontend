<template>
    <v-menu offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
        <template v-slot:activator="{ on, attrs }">
            <v-btn plain icon v-bind="attrs" v-on="on" @click="selection = null">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        
        <v-list class="font-weight-light pa-0" width="200">
            <v-list-item-group v-model="selection">
                <v-list-item @click="redirect('/settings')">Settings</v-list-item>
                <v-list-item @click="logOut">Log out</v-list-item>
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'AccountMenu',

    data() {
        return {
            selection: null
        }
    },

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