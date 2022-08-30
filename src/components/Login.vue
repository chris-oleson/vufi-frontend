<template>
    <v-card class="pa-6 mx-auto mt-10" width="330">
        <v-img src="../assets/logo64x64.png" max-height="50" max-width="50" class="mx-auto"></v-img>

        <v-text-field class="mx-4 mt-4" label="Email" v-model="email" :error="errorState"></v-text-field>
        <v-text-field class="mx-4" label="Password" type="password" v-model="password" :error="errorState" @keyup.enter="login"></v-text-field>
        <v-card-text v-if="errorState" class="error--text text-center pa-0">Email or password does not match</v-card-text>

        <v-card-actions class="justify-center mt-6">
            <v-btn width="200" color="primary" @click="login">Log In</v-btn>
        </v-card-actions>

        <v-card-actions class="justify-center">
            <v-btn width="200" color="error">Forgot Password</v-btn>
        </v-card-actions>

        <v-card-actions class="justify-center">
            <v-btn width="200" text @click="redirect('/create-account')">Create Account</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            email: '',
            password: '',
            errorState: false,
        }
    },

    mounted() {
        if (this.$store.state.userID) {
            this.$router.push('/assets')
        }
    },
    
    computed: {
        userData() { return this.$store.state.userData },
    },

    methods: {
        async login() {
            // Send login data to backend for validation
            await axios.post(`http://localhost:3000/api/auth/login`, {
                email: this.email,
                password: this.password,
            }).then(resp => {
                this.$store.commit('setUserID', resp.data)
                this.$router.push('/assets')
            }).catch(() => {
                // Handles incorrect login
                this.errorState = true
            })
        },

        redirect(link) { this.$router.push(link) },
    }
}
</script>