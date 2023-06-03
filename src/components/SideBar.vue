<template>
    <v-navigation-drawer v-if="usingApp" floating permanent :mini-variant="mini" class="elevation-4">
        <v-list class="font-weight-light pa-0" :value="page">
            <v-list-item @click="redirect('/assets')">
                <v-icon>mdi-cash-multiple</v-icon>
                <v-list-item-title>Assets</v-list-item-title>
                <v-list-item-subtitle class="text-right">{{ $store.state.totalPositiveAssets }}</v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item @click="redirect('/debts')">
                <v-icon>mdi-credit-card-multiple</v-icon>
                <v-list-item-title>Debts</v-list-item-title>
                <v-list-item-subtitle class="text-right">{{ $store.state.totalNegativeAssets }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item @click="redirect('/net-worth')">
                <v-icon>mdi-sigma</v-icon>
                <v-list-item-title>Net Worth</v-list-item-title>
                <v-list-item-subtitle class="text-right">{{ $store.state.totalPositiveAssets + $store.state.totalNegativeAssets }}</v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'SideBar',

    data() {
        return {

        }
    },

    computed: {
        mini() {
            return this.$vuetify.display.mobile
        },

        usingApp() {
            if (this.$route == '/assets' || this.$route == '/debts' || this.$route == '/net-worth') {
                return true
            }
            return false
        },

        page() {
            if (this.$route.path == "/assets") {
                return 0
            }
            else if (this.$route.path == "/debts") {
                return 1
            }
            else if (this.$route.path == "/net-worth") {
                return 2
            }
            return null
        }
    },

    methods: {
        redirect(link) {
            if (this.$route.path != link) {
                this.$router.push(link)
            }
        }
    },

    watch: {
        '$vuetify.breakpoint.mobile'(data) {
            this.mini = data
        },
    }
}
</script>