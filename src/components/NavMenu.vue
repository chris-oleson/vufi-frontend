<template>
    <v-navigation-drawer app floating clipped permanent :mini-variant="mini" class="elevation-2">
        <v-list class="font-weight-light pa-0">
            <v-list-item-group mandatory :value="page">
                <v-list-item @click="redirect('/assets')">
                    <v-list-item-icon class="mr-4">
                        <v-icon>mdi-cash-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Assets</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{ $store.state.totalAssetValue | toCurrency }}</v-list-item-subtitle>
                </v-list-item>
                
                <v-list-item @click="redirect('/debts')">
                    <v-list-item-icon class="mr-4">
                        <v-icon>mdi-credit-card-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Debts</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{ $store.state.totalDebtValue | toCurrency }}</v-list-item-subtitle>
                </v-list-item>

                <v-list-item @click="redirect('/net-worth')">
                    <v-list-item-icon class="mr-4">
                        <v-icon>mdi-sigma</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Net Worth</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{ ($store.state.totalAssetValue + $store.state.totalDebtValue) | toCurrency }}</v-list-item-subtitle>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'NavMenu',
    props: ['mini'],

    computed: {
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
        redirect(link) { this.$router.push(link) },
    }
}
</script>