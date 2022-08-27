<template>
    <div>
        <v-menu offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab small v-bind="attrs" v-on="on">
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </template>
            <v-list class="font-weight-light">
                <v-list-item>
                    <v-list-item-title>{{this.$store.state.userID}}</v-list-item-title>
                </v-list-item>

                <v-list-item-group>
                    <v-divider></v-divider>
                    <v-list-item>Account Settings</v-list-item>
                    <v-list-item @click="logOut">Log out</v-list-item>
                </v-list-item-group>
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
            this.$store.commit('setUserID', null)
            this.$router.push('/')
        }
    }
}
</script>