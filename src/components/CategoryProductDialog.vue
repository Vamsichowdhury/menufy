<template>
    <div class="text-center pa-4">
        <v-dialog v-model="getCategoryDialogData.open" width="auto">
            <v-card class="mx-auto" style="max-width: 500px; width: 350px;">
                <v-toolbar color="deep-purple-accent-4" cards dark flat>x
                    <v-card-title class="text-h6 font-weight-regular">
                        {{ getCategoryDialogData?.operation }}
                    </v-card-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
                    <v-text-field v-model="categoryName" color="deep-purple" label="Enter Category name"
                        variant="filled"></v-text-field>
                    <v-textarea v-model="categoryDesc" color="deep-purple" label="Bio" rows="1" variant="filled"
                        auto-grow></v-textarea>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="closeDialog()">
                        Cancel
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!isValid" @click="handleCategory()" :loading="isLoading"
                        color="deep-purple-accent-4">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
    name: "categoryProductDialog",
    props: ['closeCategoryDialog'],
    data() {
        return {
            categoryName: "",
            categoryDesc: "",
            isValid: false,
            isLoading: false,
        }
    },

    computed: {
        ...mapGetters("categories", ["getCategories", "getCategoryDialogData"]),

        isValid() {
            return this.categoryName && this.categoryDesc
        }
    },

    methods: {
        ...mapMutations("categories", ["setCategories", "setCategoryDialogData"]),
        ...mapActions("categories", ["createCategory", "editCategory"]),

        closeDialog() {
            this.setCategoryDialogData({ open: false })
        },
        handleCategory() {
            const category = {
                loading: false,
                imageSrc: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                title: this.categoryName,
                description: this.categoryDesc,
                totalItems: [],
            }
            if (this.getCategoryDialogData?.operation === "Add Category") {
                this.createCategory(category)
            } else if (this.getCategoryDialogData?.operation === "Edit Category") {
                this.editCategory({ id: this.getCategoryDialogData?.data?._id, category })
            }
            this.closeDialog()
        }
    },

    beforeUpdate() {
        this.categoryName = this.getCategoryDialogData?.data?.title || ""
        this.categoryDesc = this.getCategoryDialogData?.data?.description || ""
    },
}
</script>