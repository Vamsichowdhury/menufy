<template>
    <div style="height: 90vh;" class="d-flex align-start pa-4 mt-6">
        <v-card class="text-center mx-auto" elevation="12" max-width="400" rounded="lg" width="100%"
            style="border: 2px solid red;">
            <v-card-item class="bg-primary">
                <v-card-title class="text-h5 text-center font-weight-bold">
                    <span class="text-h5 mr-6">Login</span>
                </v-card-title>
            </v-card-item>
            <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
                <v-text-field v-model="email" type="email" color="primary" label="Enter email"
                    variant="outlined"></v-text-field>
                <v-text-field v-model="password" type="password" color="primary" label="Enter password"
                    variant="outlined"></v-text-field>
                <v-container fluid class="d-flex flex-column">
                    <p class="py-5 pr-8 font-weight-bold">Login as:</p>
                    <v-divider></v-divider>

                    <v-radio-group inline v-model="adminLevel" class="d-flex justify-space-between">
                        <v-radio color="primary" label="Admin" value="admin" class="pr-4 pl-8"></v-radio>
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
            <!-- <v-btn class="text-none font-weight-bold " color="info" text="Forgot Password?" variant="text"></v-btn> -->
        </v-card>
    </div>
    <v-snackbar :color="snackbarColor" v-model="snackbar" :timeout="timeout" location="top">
        {{ text }}

        <template v-slot:actions>
            <v-btn variant="text" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>

</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
    data() {
        return {
            adminLevel: null,
            email: '',
            password: '',
            isValid: false,
            snackbar: false,
            text: '',
            timeout: 2000,
            snackbarColor: null
        }
    },
    computed: {
        isValid() {
            return this.email && this.password && this.adminLevel
        }
    },
    methods: {
        ...mapActions("adminPanel/auth", ["setLoginAdmin"]),
        ...mapMutations("adminPanel/auth", ["setCurrentAdmin", "setAuthStatus"]),

        async handleLogin() {
            if (this.email && this.password) {
                const user = {
                    adminLevel: this.adminLevel,
                    email: this.email,
                    password: this.password
                };
                try {
                    const response = await this.setLoginAdmin(user);
                    if (response?.status === 200) {
                        localStorage.setItem('authToken', response?.data?.token);
                        const { _id, adminLevel, email } = response?.data;
                        this.setCurrentAdmin({ _id, adminLevel, email });
                        this.setAuthStatus("Login");
                        this.$router.push('/admin/categories');
                    } else {
                        // Show error message from the server response
                        // alert(response?.data?.message || 'Invalid credentials');
                        this.snackbar = true
                        this.text = response?.data?.message || 'Invalid credentials'
                        this.snackbarColor = 'error'
                    }
                } catch (error) {
                    // Show error message from the server response
                    if (error.response && error.response.data && error.response.data.message) {
                        // alert(error.response.data.message);
                        this.handleSnackbar(error.response.data.message, 'warning', 3000)
                    } else {
                        const text = 'An error occurred during login. Please try again.'
                        this.handleSnackbar(text, 'warning', 3000)
                        // alert('An error occurred during login. Please try again.');
                    }
                }
            } else {
                const text = 'Invalid credentials'
                this.handleSnackbar(text, 'error', 3000)
            }
        },
        handleSnackbar(text, color, time) {
            this.snackbar = true
            this.text = text
            this.snackbarColor = color
            this.timeout = time
        }
    },
}
</script>