<template>
    <v-card class="pa-6 mx-auto mt-10" width="330">
        <v-form v-model="validForm">
            <v-img src="../assets/logo64x64.png" max-height="50" max-width="50" class="mx-auto"></v-img>

            <v-text-field class="mx-4 mt-4" label="First Name" v-model="firstName" :rules="[rules.required]"></v-text-field>

            <v-text-field class="mx-4" label="Last Name" v-model="lastName" :rules="[rules.required]"></v-text-field>

            <v-text-field class="mx-4" label="Email Address" v-model="email" :error="emailExists" :rules="[rules.required, rules.email]"></v-text-field>
            <v-card-text v-if="emailExists" class="error--text text-center pa-0">This email is already registered</v-card-text>
            <v-card-actions v-if="emailExists" class="justify-center">
                <v-btn width="200" color="error">Forgot Password</v-btn>
            </v-card-actions>

            <v-text-field class="mx-4" label="Password" type="password" v-model="password" :rules="[rules.required]"></v-text-field>
            <v-text-field class="mx-4" label="Confirm Password" type="password" v-model="confirmPassword" :rules="[rules.match]"></v-text-field>

            <v-card-actions class="justify-center mt-6">
                <v-btn width="200" color="primary" @click="createAccount">Create Account</v-btn>
            </v-card-actions>

            <v-card-actions class="justify-center">
                <v-btn width="200" text @click="redirect('/login')">Log In</v-btn>
            </v-card-actions>
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
            confirmPassword: '',

            rules: {
                required: value => !!value || 'Required field',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail'
                },
                match: value => value === this.password || 'Passwords do not match'
            },
        }
    },

    mounted() {

    },

    computed: {

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
                }).then(resp => {
                    this.$store.commit('setUserID', resp.data)
                    this.$router.push('/assets')
                }).catch((err) => {
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