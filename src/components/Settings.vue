<template>
    <v-card class="pa-6 mx-auto mt-10" width="500">
        <v-card-title class="font-weight-light text-h5 justify-center">Settings</v-card-title>

        <v-card-actions class="justify-center">
            <v-btn-toggle mandatory v-model="selection">
                <v-btn small class="pa-4">System Theme</v-btn>
                <v-btn small class="pa-4">Light Theme</v-btn>
                <v-btn small class="pa-4">Dark Theme</v-btn>
            </v-btn-toggle>
        </v-card-actions>

        <v-card-actions class="justify-center mt-6">
            <v-btn width="200" color="primary" @click="save">Save</v-btn>
        </v-card-actions>

        <v-card-actions class="justify-center">
            <v-btn width="200" text @click="cancel">Cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'Settings',

    data() {
        return {
            selection: this.$store.state.settings.darkMode
        }
    },

    mounted() {

    },
    
    computed: {

    },

    methods: {
        save() {
            this.$store.commit('setSettings', {darkMode: this.selection})
            this.redirect('/assets')
        },

        cancel() {
            if (this.$store.state.settings.darkMode === 0) {
                this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            }
            else if (this.$store.state.settings.darkMode === 1){
                this.$vuetify.theme.dark = false
            }
            else if (this.$store.state.settings.darkMode === 2){
                this.$vuetify.theme.dark = true
            }
            this.redirect('/assets')
        },

        redirect(link) { this.$router.push(link) },
    },

    watch: {
        selection(data) {
            if (data == 0) {
                this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            }
            else if (data == 1) {
                this.$vuetify.theme.dark = false
            }
            else if (data == 2) {
                this.$vuetify.theme.dark = true
            }
        },
    }
}
</script>