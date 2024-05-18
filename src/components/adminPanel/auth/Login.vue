<template>
    <v-card class="text-center mx-auto" elevation="12" max-width="400" rounded="lg" width="100%">
        <v-card-item class="bg-primary">
            <v-card-title class="text-h5 text-center font-weight-bold">
                <span class="text-h5">Login</span>
            </v-card-title>
        </v-card-item>
        <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
            <v-text-field v-model="email" type="email" color="primary" label="Enter email"
                variant="filled"></v-text-field>
            <v-text-field v-model="password" type="password" color="primary" label="Enter password"
                variant="filled"></v-text-field>
            <v-container fluid>
                <p>Login as:</p>
                <v-radio-group inline v-model="adminLevel" class="d-flex justify-space-around">
                    <v-radio color="primary" label="Admin" value="admin"></v-radio>
                    <v-radio color="primary" label="Super Admin" value="superAdmin"></v-radio>
                </v-radio-group>
            </v-container>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn :disabled="!isValid" color="primary" variant="flat" block @click="handleLogin()">
                Login
            </v-btn>
        </v-card-actions>
        <v-btn class="text-none font-weight-bold " color="info" text="Forgot Password?" variant="text"></v-btn>
    </v-card>
    <!-- </v-sheet> -->
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
    data() {
        return {
            adminLevel: null,
            email: '',
            password: '',
            isValid: false
        }
    },
    computed: {
        isValid() {
            return this.email && this.password
        }
    },
    methods: {
        ...mapActions("adminPanel/auth", ["setLoginAdmin"]),
        ...mapMutations("adminPanel/auth", ["setCurrentAdmin"]),
        async handleLogin() {
            // Replace with real authentication logic
            if (this.email && this.password) {
                const user = {
                    adminLevel: this.adminLevel,
                    email: this.email,
                    password: this.password
                }
                const response = await this.setLoginAdmin(user)
                console.log(response)
                if (response?.status === 200) {
                    localStorage.setItem('authToken', response?.data?.token)
                    const { _id, adminLevel, email } = response?.data
                    this.setCurrentAdmin({ _id, adminLevel, email })
                    this.$router.push('/admin/categories')

                } else {
                    alert("Invalid credentials")
                }


            } else {
                alert('Invalid credentials')
            }
        }
    }
}
</script>