<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <v-img eager src="../assets/logo64x64.png" max-height="50" max-width="50" class="mx-auto"></v-img>

        <v-text-field class="mt-4" label="Email" v-model="email" :error="errorState"></v-text-field>
        <v-text-field class="mb-4" label="Password" type="password" v-model="password" :error="errorState" @keyup.enter="login"></v-text-field>

        <v-card-text v-if="errorState" class="error--text pa-0">Email or password does not match</v-card-text>
        <v-btn v-if="errorState" width="200" small tile class="error mt-4">Forgot Password?</v-btn>

        <v-btn width="200" tile class="primary my-4" @click="login">Log In</v-btn>
        <v-btn width="200" text tile class="font-weight-light" @click="$router.push('/signup')">Sign Up</v-btn>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',

    data() {
        return {
            email: '',
            password: '',
            errorState: false,
            correctInfo: false,
        }
    },

    mounted() {

    },
    
    computed: {
        userData() { return this.$store.state.userData },
    },

    methods: {
        async login() {
            // Send login data to backend for validation
            await axios.post('http://localhost:3000/api/auth/login', {
                email: this.email,
                password: this.password,
            }).then(() => {
                this.$store.commit('login')
                this.$store.dispatch('getAllAssetData')
                this.$router.push('/assets')
            }).catch(() => {
                // Handles incorrect login
                this.errorState = true
            })
        },

        applyTheme() {
            if (this.$store.state.userPrefs.theme === 0) {
                this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            }
            else if (this.$store.state.userPrefs.theme === 1){
                this.$vuetify.theme.dark = false
            }
            else if (this.$store.state.userPrefs.theme === 2){
                this.$vuetify.theme.dark = true
            }
        },
    }
}
</script>