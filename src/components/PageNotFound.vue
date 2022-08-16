<template>
    <div>
        <h1 class="mt-10 font-weight-light text-center">404 error - Page not found</h1>
        <h3 class="mt-10 font-weight-light text-center">Make sure you have the correct url and permissions</h3>
        <div class="mt-10 d-flex justify-center">
            <v-btn v-if="this.$store.state.currentUser.email" class="primary" @click="redirect('/dashboard')">Return to dashboard</v-btn>
            <v-btn v-if="!this.$store.state.currentUser.email" class="primary" @click="redirect('/')">Return to home page</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageNotFound',

    methods: {
        redirect(link) { this.$router.push(link) }
    }
}
</script>