<template>
    <v-card class="pa-10 mx-auto mt-10" width="330">
        <v-form v-model="validForm">
            <v-img eager src="../assets/logo64x64.png" max-height="50" max-width="50" class="mx-auto mb-4"></v-img>

            <v-text-field class="mt-4" label="Current Password" :error="incorrectPassword" type="password" v-model="currentPassword" :rules="[rules.required]"></v-text-field>
            <v-card-text v-if="incorrectPassword" class="error--text pa-0">Incorrect password</v-card-text>

            <v-text-field class="mt-4" label="New Password" type="password" v-model="newPassword" :rules="[rules.required]"></v-text-field>
            <v-text-field class="mt-4" label="Confirm New Password" type="password" v-model="confirmNewPassword" :rules="[rules.match]" @keyup.enter="changePassword"></v-text-field>

            <v-card-actions class="justify-center mt-6">
                <v-btn color="primary" width="200" @click="changePassword">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UpdatePassword',

    data() {
        return {
            currentPassword: null,
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
                await axios.patch(`http://localhost:3000/api/user/${this.$store.state.userID}/update/password`, {
                    oldPassword: this.currentPassword,
                    newPassword: this.newPassword
                })
                .then(() => {
                    // TODO: send success notification
                    this.$router.push('/assets')
                })
                .catch((err) => {
                    // Handles incorrect current password
                    if (err.response.status == 404) {
                        this.incorrectPassword = true
                    }
                })
            }
        }
    },
}
</script>