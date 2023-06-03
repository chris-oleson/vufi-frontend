<template>
    <v-menu offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-1" plain icon large v-bind="attrs" v-on="on">
                <v-icon>mdi-cog</v-icon>
            </v-btn>
        </template>
        
        <v-list nav class="font-weight-light" width="200">
            <v-list-item @click="redirect('/settings')"><v-icon class="mr-4">mdi-cog</v-icon>Settings</v-list-item>
            <v-list-item @click="logOut"><v-icon class="mr-4">mdi-logout</v-icon>Log out</v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import axios from 'axios'
export default {
    name: 'AccountMenu',

    data() {
        return {

        }
    },

    methods: {
        logOut() {
            axios.post(process.env.VUE_APP_URL + 'auth/logout').then(() => {
                this.$store.commit('logOut')
                this.redirect('/')
            })
        },

        redirect(link) {
            if (this.$route.path != link) {
                this.$router.push(link)
            }
        },
    },
}
</script>