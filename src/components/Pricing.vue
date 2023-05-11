<template>
    <v-sheet class="text-center primary" height="100%">
        <v-sheet class="px-5 py-12 mb-n16">
            <h1 class="font-weight-light pa-4">Pricing</h1>
            <div class="font-weight-light">Choose the plan that works best for you.</div>
            <div class="font-weight-light mb-16">Change your plan at any time!</div>
        </v-sheet>
        
        <v-sheet height="100" class="mb-n16"></v-sheet>

        <v-container fluid>
            <v-row justify="center">
                <v-flex xs12 md4 lg3 class="ma-5">
                    <v-sheet elevation="4" width="330" class="py-16 mx-auto secondary">
                        <h1 class="font-weight-light">$9<p class="font-weight-light text-subtitle-1 d-inline">/month</p></h1>
                        <p class="font-weight-light mt-4 mb-10">Cancel any time!</p>
                        <v-btn class="primary" width="200" large tile @click="$router.push('/signup')">Start Free Trial</v-btn>
                    </v-sheet>
                </v-flex>

                <v-flex xs12 md4 lg3 class="ma-5">
                    <v-sheet elevation="4" width="330" class="py-16 mx-auto secondary">
                        <h1 class="font-weight-light">$90<p class="font-weight-light text-subtitle-1 d-inline">/year</p></h1>
                        <p class="font-weight-light mt-4 mb-10">Two months free!</p>
                        <v-btn class="primary" width="200" large tile @click="$router.push('/signup')">Start Free Trial</v-btn>
                    </v-sheet>
                </v-flex>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
export default {
    name: 'Pricing',
}
</script>