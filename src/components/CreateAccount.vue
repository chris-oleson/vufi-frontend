<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <v-form v-model="validForm" ref="form">
            <v-img src="../assets/logo.svg" max-height="50" max-width="50" class="mx-auto mb-4"/>

            <v-text-field variant="underlined" label="Email" v-model="email" :error="emailExists" :rules="[rules.required, rules.email]"/>
            <v-text-field variant="underlined" label="Password" type="password" v-model="password" :rules="[rules.required]"/>
            <v-text-field variant="underlined" class="mb-4" label="Confirm Password" type="password" v-model="confirmPassword" :rules="[rules.required, rules.match]" @keyup.enter="createAccount"/>

            <v-card-text v-if="emailExists" class="text-error pa-0">This email is already registered</v-card-text>
            <v-btn v-if="emailExists" width="200" size="small" rounded="0" class="bg-error mt-4">Forgot Password?</v-btn>

            <v-btn width="200" rounded="0" class="bg-primary my-4" @click="createAccount">Sign Up</v-btn>
            <v-btn width="200" variant="text" rounded="0" class="font-weight-light" @click="$router.push('/login')">Log In</v-btn>
        </v-form>
    </v-card>
</template>

<script>
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
                match: value => (value === this.password) || 'Passwords do not match'
            },
        }
    },

    mounted() {

    },

    methods: {
        async createAccount() {
            this.$refs.form.validate()

            // Check if fields are correct
            if (this.validForm) {
                // Add user to the database
                await this.$axios.post('auth/create', {
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                })
                .then((resp) => {
                    this.$store.commit('logIn', resp.data[0])
                    this.$router.push('/assets')
                })
                .catch((err) => {
                    // Handles pre-existing email
                    if (err.response.status == 409) {
                        this.emailExists = true
                    }
                    else if (err.response.status == 404) {
                        console.log(err.response)
                    }
                })
            }
        },
    },
}
</script>