<template>
    <div class="d-flex justify-center">
        <v-card class="pa-6 ma-10" min-width="330">
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
                <v-btn width="200" @click="redirect('/create-account')">Sign Up</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            errorState: false,
        }
    },

    mounted() {
        this.$store.dispatch('LOAD_USERS')
    },
    
    computed: {
        userData() { return this.$store.state.userData },

        validateUser() {
            for (let i = 0; i < this.userData.length; i++) {
                if (this.email == this.userData[i].email) {
                    if (this.password == this.userData[i].password) {
                        return this.userData[i]
                    }
                }
            }
            return false
        }
    },

    methods: {
        login() {
            if (this.validateUser) {
                this.$store.commit('setCurrentUser', this.validateUser)
                this.$router.push('/assets')
            }
            else {
                this.errorState = true
            }
        },

        redirect(link) { this.$router.push(link) },
    }
}
</script>