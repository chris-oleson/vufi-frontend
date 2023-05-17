<template>
    <div class="text-center">
        <h1 class="mt-10 font-weight-light">404 error - Page not found</h1>
        <h3 class="mt-10 font-weight-light">Make sure you have the correct url and permissions</h3>
        <v-btn class="mt-10 primary" @click="$router.push('/')">Return to home page</v-btn>
    </div>
</template>

<script>
export default {
    name: 'PageNotFound',
}
</script>