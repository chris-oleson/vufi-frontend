<template>
    <v-app>
        <v-app-bar app>
            <v-img src="./assets/icons8-stack-of-money-96.png" max-height="50" max-width="50"></v-img>
            <h1 class="ml-2 font-weight-light">NetWorth</h1>
        </v-app-bar>
        <v-main>
            <v-row>
                <v-col cols="4">
                    <AssetList/>
                </v-col>
                <v-col cols="8">
                    <Visualization/>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script>
import AssetList from './components/AssetList';
import Visualization from './components/Visualization.vue';

export default {
    name: 'App',

    components: {
        AssetList,
        Visualization,
    },

    data() {
        return {

        }
    },
};
</script>

<style>
.v-btn:focus::before {
    opacity: 0 !important;
}
</style>