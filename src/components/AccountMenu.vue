<template>
    <v-menu offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
        <template v-slot:activator="{ props }">
            <v-btn icon="mdi-cog" variant="plain" size="large" class="mr-1" v-bind="props"/>
        </template>
        
        <v-list class="font-weight-light" width="200">
            <v-list-item prepend-icon="mdi-cog" variant="plain" @click="redirect('/settings')">Settings</v-list-item>
            <v-list-item prepend-icon="mdi-logout" variant="plain" @click="logOut">Log out</v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'AccountMenu',

    methods: {
        logOut() {
            this.$axios.post('auth/logout').then(() => {
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