<template>
    <div :class="`${$vuetify.display.mdAndUp ? 'admin-dashboard-container' : 'admin-dashboard-mb-container'}`">
        <v-data-table-virtual :headers="headers" :items="admins" height="75vh">
            <template v-slot:item.permission="{ value }">
                <v-chip :color="getColor(value)">
                    {{ value }}
                </v-chip>
            </template>
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Admins</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="800px">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mb-2" color="primary" dark v-bind="props">
                                Register Admin
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" md="6" sm="6">
                                            <v-text-field type="email" variant="outlined" v-model="editedItem.email"
                                                label="Email"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6" sm="6">
                                            <v-select variant="outlined" v-model="editedItem.permission"
                                                label="Permission" :items="['Super Admin', 'Admin']"></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="save">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5" >Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon class="me-2" size="small" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table-virtual>
    </div>
</template>
<script>
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                title: 'Email',
                align: 'start',
                sortable: false,
                key: 'email',
            },
            {
                title: 'Permission',
                align: 'center',
                sortable: true,
                key: 'permission',
            },
            { title: 'Actions', key: 'actions', sortable: false },
        ],
        admins: [],
        editedIndex: -1,
        editedItem: {
            email: '',
            permission: "Admin"
        },
        defaultAdmin: {
            email: '',
            permission: ""
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Register new Admin' : 'Edit Admin'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            this.admins = [
                {
                    email: 'mvk09099@gmail.com',
                    permission: "Super Admin",
                },
                {
                    email: 'mvk090992@gmail.com',
                    permission: "Admin",
                },
            ]
        },

        editItem(item) {
            this.editedIndex = this.admins.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.admins.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.admins.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultAdmin)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultAdmin)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.admins[this.editedIndex], this.editedItem)
            } else {
                this.admins.push(this.editedItem)
            }
            this.close()
        },
        getColor(permission) {
            if (permission === 'Super Admin') return 'green'
            else return 'orange'
        },
    },
}
</script>

<style scoped>
.admin-dashboard-container {
    width: 60vw;
    margin: 20px auto;
}

.admin-dashboard-mb-container {
    width: 90vw;
    margin: 20px auto;
}

.custom-data-table {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Infinite scroll styling */
.v-data-table__wrapper {
    max-height: 60vh;
    overflow-y: auto;
}
</style>
