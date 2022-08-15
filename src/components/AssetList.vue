<template>
    <div>
        <h2 class="mb-4 font-weight-light text-center">Assets</h2>

        <Asset v-for="(data, i) in assetData" :key="i" :data="assetData[i]"/>

        <h2 class="d-flex justify-center">
            <AddButton/>
        </h2>
    </div>
</template>

<script>
import AddButton from '/src/components/AddButton.vue'
import Asset from '/src/components/Asset.vue'

export default {
    name: 'AssetList',
    components: {
        AddButton,
        Asset
    },

    data() {
        return {
            showAlert: true,
        }
    },

    mounted() {
        this.$store.dispatch('LOAD_ASSETS')
    },

    computed: {
        assetData() { return this.$store.state.assetData }
    },
}
</script>