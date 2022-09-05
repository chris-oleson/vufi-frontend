<template>
    <v-card class="pa-10 mx-auto mt-10" width="330">
        <v-img eager src="../assets/logo64x64.png" max-height="50" max-width="50" class="mx-auto"></v-img>

        <v-text-field class="mt-6" label="Current Password" :error="incorrectPassword" type="password" v-model="password"></v-text-field>
        <v-card-text v-if="incorrectPassword" class="error--text pa-0">Incorrect password</v-card-text>

        <v-form v-model="validForm">
            <v-text-field class="mt-4" label="New Email" v-model="newEmail" :rules="[rules.required]"></v-text-field>
            <v-text-field class="mt-4" label="Confirm New Email" v-model="confirmNewEmail" :rules="[rules.match]" @keyup.enter="changeEmail"></v-text-field>

            <v-card-actions class="justify-center mt-6">
                <v-btn color="primary" width="200" @click="changeEmail">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UpdateEmail',

    data() {
        return {
            password: null,
            newEmail: null,
            confirmNewEmail: null,

            incorrectPassword: false,
            validForm: false,
            rules: {
                required: value => !!value || 'Required field',
                match: value => value === this.newEmail || 'Emails do not match'
            },
        }
    },

    methods: {
        async changeEmail () {
            // Check if fields are correct
            if (this.validForm) {
                // Update email in the database
                await axios.patch(`http://localhost:3000/api/user/${this.$store.state.userID}/email`, {
                    password: this.password,
                    email: this.newEmail
                })
                .then(() => {
                    this.$store.commit("setNotification", {
                        text: "Successfully updated email",
                        color: "primary"}
                    )
                    this.$router.push('/assets')
                })
                .catch(() => {
                    // Handles incorrect password
                    this.incorrectPassword = true
                })
            }
        }
    },
}
</script>