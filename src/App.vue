<template>
    <v-app>
        <v-app-bar app>
            <v-img src="./assets/logo64x64.png" max-height="50" max-width="50" class="mr-2"></v-img>
            <h1 class="font-weight-light d-none d-sm-flex">VuFi</h1>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    mounted() {
        // Check user prefs for dark mode
        this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },

    watch: {
        // Update tab text when the page changes
        $route: {
            immediate: true,
            handler(newRoute) {
                document.title = newRoute.meta.title + ' | VuFi';
            }
        },
    }
};
</script>

<style>
/* Text selection color */
::selection {
    background: #aed581
}
::-moz-selection {
  background: #aed581
}

/* Preventing changes to button color when focused */
.v-btn:focus::before {
    opacity: 0 !important
}
</style>