<template>
    <v-menu offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
        <template v-slot:activator="{ on, attrs }">
            <v-btn plain icon v-bind="attrs" v-on="on" @click="selection = null">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </template>
        
        <v-list class="font-weight-light" width="200">
            <v-list-item-group v-model="selection">
                <v-list-item @click="$router.push('/')">Home</v-list-item>
                <v-list-item @click="$router.push('/pricing')">Pricing</v-list-item>
                <v-list-item @click="$router.push('/about')">About</v-list-item>
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'TopBarMenu',

    data() {
        return {
            selection: null
        }
    }
}
</script>