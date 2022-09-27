<template>
    <div>
        <v-sheet class="text-center">
            <v-sheet height="150"></v-sheet>
            <v-sheet class="mx-auto px-5" max-width="900">
                <h3 class="font-weight-light text-h3 mb-16"></h3>
                <div class="font-weight-light mb-10"></div>
            </v-sheet>
            <v-sheet height="100"></v-sheet>
        </v-sheet>
    </div>
</template>

<script>
export default {
    name: 'About',

    methods: {
        redirect(link) { this.$router.push(link) }
    }
}
</script>