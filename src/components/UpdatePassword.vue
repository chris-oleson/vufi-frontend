<template>
    <v-card class="pa-10 mx-auto mt-10 text-center" width="330">
        <v-img eager src="../assets/logo.svg" max-height="50" max-width="50" class="mx-auto"></v-img>

        <v-text-field class="mt-4" label="Current Password" :error="incorrectPassword" type="password" v-model="password" :rules="[rules.required]"></v-text-field>

        <v-form v-model="validForm">
            <v-text-field class="my-4" label="New Password" type="password" v-model="newPassword" :rules="[rules.required]"></v-text-field>
            <v-text-field class="mb-4" label="Confirm New Password" type="password" v-model="confirmNewPassword" :rules="[rules.match]" @keyup.enter="changePassword"></v-text-field>

            <v-card-text v-if="incorrectPassword" class="error--text pa-0">Incorrect password</v-card-text>
            <v-btn tile class="primary mt-4" width="200" @click="changePassword">Submit</v-btn>
        </v-form>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UpdatePassword',

    data() {
        return {
            password: null,
            newPassword: null,
            confirmNewPassword: null,

            incorrectPassword: false,
            validForm: false,
            rules: {
                required: value => !!value || 'Required field',
                match: value => value === this.newPassword || 'Passwords do not match'
            },
        }
    },

    methods: {
        async changePassword() {
            // Check if fields are correct
            if (this.validForm) {
                // Update password in the database
                await axios.patch(`http://localhost:3000/api/user/${this.$store.state.userID}/password`, {
                    password: this.password,
                    newPassword: this.newPassword
                })
                .then(() => {
                    this.$store.commit("setNotification", {
                        text: "Successfully updated password",
                        color: "primary"}
                    )
                    this.$router.push('/dashboard')
                })
                .catch(() => {
                    // Handles incorrect current password
                    this.incorrectPassword = true
                })
            }
        }
    },
}
</script>