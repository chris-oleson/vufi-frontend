<template>
    <v-navigation-drawer v-if="usingApp" permanent floating :rail="rail" class="elevation-4">
        <v-list class="font-weight-light pa-0" :value="page">
            <v-list-item class="py-4" to="/assets">
                <template v-slot:prepend>
                    <v-icon class="mr-4">mdi-cash-multiple</v-icon>
                </template>
                <div class="d-flex justify-space-between">
                    <div class="text-no-wrap">Assets</div>
                    <div class="d-inline">{{ formatCurrency($store.state.totalPositiveAssets) }}</div>
                </div>
            </v-list-item>

            <v-list-item class="py-4" to="/debts">
                <template v-slot:prepend>
                    <v-icon class="mr-4">mdi-credit-card-multiple</v-icon>
                </template>
                <div class="d-flex justify-space-between">
                    <div class="text-no-wrap">Debts</div>
                    <div class="d-inline">{{ formatCurrency($store.state.totalNegativeAssets) }}</div>
                </div>
            </v-list-item>

            <v-list-item class="py-4" to="/net-worth">
                <template v-slot:prepend>
                    <v-icon class="mr-4">mdi-sigma</v-icon>
                </template>
                <div class="d-flex justify-space-between">
                    <div class="text-no-wrap">Net Worth</div>
                    <div class="d-inline">{{ formatCurrency($store.state.totalPositiveAssets + $store.state.totalNegativeAssets) }}</div>
                </div>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'SideBar',

    methods: {
        formatCurrency(value) {
            if (typeof value !== "number") {
                return value
            }
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            })
            return formatter.format(value);
        }
    },

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