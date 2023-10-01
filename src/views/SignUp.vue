<template>
    <v-card class="pa-10 mx-auto my-10 text-center" width="330" elevation="4">
        <v-form ref="form" v-model="isValid">
            <img src="/logo.svg" height="50" width="50" class="mx-auto"/>

            <v-text-field variant="underlined" label="First Name" v-model="firstName" :rules="[rules.required]"></v-text-field>
            <v-text-field variant="underlined" label="Last Name" v-model="lastName" :rules="[rules.required]"></v-text-field>

            <v-text-field variant="underlined" label="Email" v-model="email" :rules="[rules.required, rules.email, rules.notRegistered]"/>

            <v-text-field variant="underlined" label="Password" type="password" v-model="password" :rules="[rules.required]"/>
            <v-text-field variant="underlined" class="mb-4" label="Confirm Password" type="password" v-model="confirmPassword" :rules="[rules.match]" @keyup.enter="createAccount"/>

            <v-btn v-if="emailExists" width="200" size="small" rounded="0" class="bg-error mt-4">Forgot Password?</v-btn>

            <v-btn width="200" rounded="0" class="bg-primary my-4" @click="createAccount">Create Account</v-btn>
        </v-form>
    </v-card>
</template>

<script>
export default {
    name: 'vufi-sign-up',

    data() {
        return {
            emailExists: false,
            isValid: false,

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
                match: value => (value === this.password) || 'Passwords do not match',
                notRegistered: () => this.emailExists == false || 'This email is already registered'
            },
        }
    },

    methods: {
        async createAccount() {
            this.isValid = true
            this.emailExists = false

            // Check if fields are correct
            if (this.isValid) {
                // Add user to the database
                await this.$axios.post('auth/create', {
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                })
                .then(() => {
                    this.$store.commit('logIn')
                    this.$router.push('/pricing')
                })
                .catch((err) => {
                    // Handles pre-existing email
                    if (err.response.status == 409) {
                        this.emailExists = true
                        this.$refs.form.validate()
                    }
                })
            }
        },
    },
}
</script>