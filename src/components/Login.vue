<template>
    <div class="d-flex justify-center">
        <v-card class="pa-6 ma-10" min-width="330">
            <v-card-title class="font-weight-light justify-center">Login</v-card-title>
            <v-text-field class="mx-4" label="Username" v-model="username" :error="errorState"></v-text-field>
            <v-text-field class="mx-4" label="Password" type="password" v-model="password" :error="errorState" @keyup.enter="login"></v-text-field>
            <v-card-text v-if="errorState" class="error--text text-center">Username or password does not match</v-card-text>
            <v-card-actions class="justify-center mt-6">
                <v-btn width="200" color="primary" @click="login">Log In</v-btn>
            </v-card-actions>
            <v-card-actions class="justify-center">
                <v-btn width="200" color="error">Forgot Password</v-btn>
            </v-card-actions>
            <v-card-actions class="justify-center">
                <v-btn width="200">Create Account</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                errorState: false,

                rules: {
                    username() { this.checkUserData || 'Username does not match' }
                }
            }
        },

        mounted() {
            this.$store.dispatch('LOAD_USERS')
        },
        
        computed: {
            userData() { return this.$store.state.userData },

            checkUserData() {
                for (let i = 0; i < this.userData.length; i++) {
                    if (this.username == this.userData[i].username) {
                        if (this.password == this.userData[i].password) {
                        return true
                        }
                    }
                }

                return false
            }
        },

        methods: {
            login() {
                if (this.checkUserData) {
                    this.$router.push('/dashboard')
                }
                else {
                    this.errorState = true
                }
            },
        }
    }
</script>