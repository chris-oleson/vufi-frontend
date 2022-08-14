<template>
    <div class="d-flex justify-center">
        <v-card class="px-10 py-6 ma-10">
            <v-card-title class="font-weight-light justify-center">Login</v-card-title>
            <v-text-field label="Username"></v-text-field>
            <v-text-field label="Password"></v-text-field>
            <v-card-actions class="justify-center mt-6">
                <v-btn width="200" color="primary" @click="this.login">Log In</v-btn>
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
        methods: {
            login() {
                this.$router.push('/dashboard')
            }
        }
    }
</script>