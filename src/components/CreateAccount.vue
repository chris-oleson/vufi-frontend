<template>
    <div class="d-flex justify-center">
        <v-card class="pa-6 ma-10" min-width="330">
            <v-img src="../assets/logo64x64.png" max-height="50" max-width="50" class="mx-auto"></v-img>
            <v-text-field class="mx-4 mt-4" label="First Name" v-model="firstName"></v-text-field>
            <v-text-field class="mx-4" label="Last Name" v-model="lastName"></v-text-field>

            <v-text-field class="mx-4" label="Email Address" v-model="email" :error="emailExists"></v-text-field>
            <v-card-text v-if="emailExists" class="error--text text-center pa-0">This email is already registered</v-card-text>
            <v-card-actions v-if="emailExists" class="justify-center">
                <v-btn width="200" color="error">Forgot Password</v-btn>
            </v-card-actions>

            <v-text-field class="mx-4" label="Password" type="password" v-model="password"></v-text-field>
            <v-text-field class="mx-4" label="Confirm Password" type="password" v-model="confirmPassword" :error="passwordsMatch"></v-text-field>
            <v-card-text v-if="passwordsMatch" class="error--text text-center pa-0">Passwords do not match</v-card-text>

            <v-card-actions class="justify-center mt-6">
                <v-btn width="200" color="primary" @click="createAccount">Create Account</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'CreateAccount',

    data() {
        return {
            emailExists: false,
            passwordsMatch: false,

            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    },

    mounted() {
        this.$store.dispatch('LOAD_USERS')
    },

    computed: {
        userData() { return this.$store.state.userData },

        validateEmail() {
            for (let i = 0; i < this.userData.length; i++) {
                if (this.email == this.userData[i].email) {
                    return false
                }
            }
            return true
        },

        validatePassword() {
            if (this.password == this.confirmPassword) {
                return true
            }
            return false
        }
    },

    methods: {
        createAccount() {

            // Check if the email is available
            if (this.validateEmail) {

                // Check if the passwords match
                if (this.validatePassword) {
                    let newUser = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password
                    }

                    // Add user to the database
                    this.$store.dispatch('ADD_USER', newUser)

                    // Log in with new user
                    this.$store.commit('setCurrentUser', newUser)
                    this.$router.push('/assets')
                }
                else {
                    this.passwordsMatch = true
                }
            }
            else {
                this.emailExists = true
                this.passwordsMatch = !this.validatePassword
            }
        },
    },
}
</script>