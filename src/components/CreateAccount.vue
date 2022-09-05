<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <v-form v-model="validForm">
            <v-img eager src="../assets/logo64x64.png" max-height="50" max-width="50" class="mx-auto mb-4"></v-img>

            <v-text-field label="First Name" v-model="firstName"></v-text-field>
            <v-text-field label="Last Name" v-model="lastName"></v-text-field>

            <v-text-field label="Email" v-model="email" :error="emailExists" :rules="[rules.required, rules.email]"></v-text-field>
            <v-card-text v-if="emailExists" class="error--text pa-0">This email is already registered</v-card-text>
            <v-btn v-if="emailExists" width="200" class="error my-4">Forgot Password?</v-btn>

            <v-text-field label="Password" type="password" v-model="password" :rules="[rules.required]"></v-text-field>

            <v-btn width="200" class="primary mt-6 mb-4" @click="createAccount">Sign Up</v-btn>
            <v-btn width="200" text @click="redirect('/login')">Log In</v-btn>
        </v-form>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CreateAccount',

    data() {
        return {
            emailExists: false,
            validForm: false,

            firstName: '',
            lastName: '',
            email: '',
            password: '',

            rules: {
                required: value => !!value || 'Required field',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail'
                },
            },
        }
    },

    mounted() {
        if (this.$store.state.userID) {
            this.$router.push('/assets')
        }
    },

    methods: {
        async createAccount() {
            // Check if fields are correct
            if (this.validForm) {
                // Add user to the database
                await axios.post('http://localhost:3000/api/auth/create', {
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                })
                .then(resp => {
                    this.$store.commit('setUserID', resp.data)
                    this.$router.push('/assets')
                })
                .catch((err) => {
                    // Handles pre-existing email
                    if (err.response.status == 409) {
                        this.emailExists = true
                    }
                })
            }
        },

        redirect(link) { this.$router.push(link) },
    },
}
</script>