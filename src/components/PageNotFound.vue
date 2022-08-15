<template>
    <div>
        <h1 class="mt-10 font-weight-light text-center">404 error - Page not found</h1>
        <h3 class="mt-10 font-weight-light text-center">Make sure you have the correct url and permissions</h3>
        <div class="mt-10 d-flex justify-center">
            <v-btn color="primary" @click="redirect">Return to Dashboard</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageNotFound',

    methods: {
        redirect() { this.$router.push('/dashboard') }
    }
}
</script>