<template>
    <v-navigation-drawer v-if="usingApp" permanent :rail="rail" class="elevation-4">
        <v-list class="font-weight-light pa-0" :value="page">
            <v-list-item prepend-icon="mdi-cash-multiple" class="py-4" to="/assets">
                <div class="d-flex justify-space-between">
                    <div class="d-inline">Assets</div>
                    <div class="d-inline">{{ $store.state.totalPositiveAssets }}</div>
                </div>
            </v-list-item>

            <v-list-item prepend-icon="mdi-credit-card-multiple" class="py-4" to="/debts">
                <div class="d-flex justify-space-between">
                    <div class="d-inline">Debts</div>
                    <div class="d-inline">{{ $store.state.totalNegativeAssets }}</div>
                </div>
            </v-list-item>

            <v-list-item prepend-icon="mdi-sigma" class="py-4" to="/net-worth">
                <div class="d-flex justify-space-between">
                    <div class="d-inline">Net Worth</div>
                    <div class="d-inline">{{ $store.state.totalPositiveAssets + $store.state.totalNegativeAssets }}</div>
                </div>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'SideBar',

    computed: {
        rail() {
            return this.$vuetify.display.mobile
        },

        usingApp() {
            if (this.$route.path == '/assets' || this.$route.path == '/debts' || this.$route.path == '/net-worth') {
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

    watch: {
        '$vuetify.breakpoint.mobile'(data) {
            this.mini = data
        },
    }
}
</script>