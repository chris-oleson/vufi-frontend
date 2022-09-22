<template>
    <div>
        <v-sheet class="text-center">
            <v-sheet height="150"></v-sheet>
            <v-sheet class="mx-auto px-5" max-width="900">
                <h3 class="font-weight-light text-h3 mb-16">About</h3>
                <h4 class="font-weight-light text-h4 mb-10"></h4>
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