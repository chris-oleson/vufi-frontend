<template>
    <v-menu offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
        <template v-slot:activator="{ on, attrs }">
            <v-btn plain icon v-bind="attrs" v-on="on" @click="selection = null">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        
        <v-list class="font-weight-light" width="200">
            <v-list-item-group v-model="selection">
                <v-list-item @click="this.$router.push('/settings')"><v-icon class="mr-4">mdi-cog-outline</v-icon>Settings</v-list-item>
                <v-list-item @click="logOut"><v-icon class="mr-4">mdi-logout</v-icon>Log out</v-list-item>
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script>
import axios from 'axios'
export default {
    name: 'AccountMenu',

    data() {
        return {
            selection: null
        }
    },

    methods: {
        logOut() {
            axios.get(`http://localhost:3000/api/auth/logout`).then(() => {
                this.$store.commit('logOut')
                this.$router.push('/')
            })
        },
    },
}
</script>