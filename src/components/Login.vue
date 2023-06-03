<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <v-img src="../assets/logo.svg" max-height="50" max-width="50" class="mx-auto"/>

        <v-text-field class="mt-4" variant="underlined" label="Email" v-model="email" :error="errorState"/>
        <v-text-field class="mb-4" variant="underlined" label="Password" type="password" v-model="password" :error="errorState" @keyup.enter="login"/>

        <v-card-text v-if="errorState" class="text-error pa-0">Email or password does not match</v-card-text>
        <v-btn v-if="errorState" width="200" size="small" rounded="0" class="bg-error mt-4">Forgot Password?</v-btn>

        <v-btn width="200" rounded="0" class="bg-primary my-4" @click="login">Log In</v-btn>
        <v-btn width="200" variant="text" rounded="0" class="font-weight-light" @click="$router.push('/signup')">Sign Up</v-btn>
    </v-card>
</template>

<script>
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
    
    computed: {
        userData() { return this.$store.state.userData },
    },

    methods: {
        async login() {
            // Send login data to backend for validation
            await this.$axios.post(process.env.VUE_APP_URL + 'auth/login', {
                email: this.email,
                password: this.password,
            }).then(resp => {
                this.$store.commit('logIn', resp.data[0])
                this.$store.dispatch('getAllAssetData')
                this.redirect('/assets')
            }).catch(() => {
                this.errorState = true
            })
        },

        redirect(link) {
            if (this.$route.path != link) {
                this.$router.push(link)
            }
        }
    }
}
</script>