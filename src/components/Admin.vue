<template>
    <v-card>
        <v-banner class="my-4" color="primary" icon="mdi-shape" lines="one">
            <v-banner-text class="text-h6">
                Categories
            </v-banner-text>

            <template v-slot:actions>
                <v-btn @click="openCategoryDialog = true" class="text-none" color="primary" min-width="92"
                    variant="outlined" rounded>
                    <v-icon class="mx-2">mdi-plus</v-icon>
                    Add Category
                </v-btn>
            </template>
        </v-banner>
        <category-product-dialog :closeCategoryDialog="closeCategoryDialog" />
        <delete-category v-if="categoryDeletionDialog" :categoryDeletionData="categoryDeletionData"
            :closeCategoryDeletionDialog="closeCategoryDeletionDialog" />
        <v-container fluid class="scrollable-container">
            <v-row>
                <v-col v-for="(item, index) in getCategories" :key="index" cols="12" md="4">
                    <v-card :disabled="item.loading" elevation="24" :loading="item.loading" class="mx-auto my-12"
                        max-width="374">
                        <template v-slot:loader="{ isActive }">
                            <v-progress-linear :active="isActive" color="deep-purple" height="4"
                                indeterminate></v-progress-linear>
                        </template>

                        <v-img height="250" :src="item.imageSrc" cover></v-img>

                        <v-card-item>
                            <v-card-title>{{ item.title }}</v-card-title>
                        </v-card-item>
                        <v-divider class="mx-4 mb-1"></v-divider>

                        <v-card-text class="description-container">
                            <div class="my-4 text-subtitle-1">
                                {{ item.description }}
                            </div>
                        </v-card-text>

                        <v-divider class="mx-4 mb-1"></v-divider>
                        <v-card-text class="d-flex justify-space-around">
                            <v-chip class="ma-2" color="primary" variant="outlined" size="x-large">
                                No.of items : {{ item.totalItems.length }}
                                <v-icon icon="mdi-outline" end></v-icon>
                            </v-chip>

                        </v-card-text>
                        <v-divider class="mx-4 mb-1"></v-divider>
                        <v-card-actions class="d-flex justify-space-around">

                            <v-btn color="deep-purple-lighten-2" text="Add to Cart" border @click="reserve(index)">
                                <v-icon class="mx-2">mdi-eye</v-icon>
                                View
                            </v-btn>
                            <v-btn color="deep-purple-lighten-2" text="Add to Cart" border
                                @click="handleCategory('Edit Category', item, index)">
                                <v-icon class="mx-2">mdi-pencil</v-icon>
                                Edit
                            </v-btn>
                            <v-btn color="deep-purple-lighten-2" text="Add to Cart" border
                                @click="handleCategoryDeletion(item, index)">
                                <v-icon class="mx-2">mdi-delete</v-icon>
                                Delete
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </v-card>
</template>
<script>
import CategoryProductDialog from "../components/CategoryProductDialog.vue"
import DeleteCategory from "../components/DeleteDialog.vue"
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
    components: {
        CategoryProductDialog,
        DeleteCategory
    },
    data: () => ({
        tab: null,
        scrollInvoked: 0,
        openCategoryDialog: false,
        categoryDeletionDialog: false
    }),
    methods: {

        ...mapActions("categories", ["fetchCategories"]),
        ...mapMutations("categories", ["setCategoryDialogData"]),

        reserve(index) {
            this.getCategories[index].loading = true;
            setTimeout(() => (this.getCategories[index].loading = false), 2000);
        },
        closeCategoryDialog(value) {
            this.openCategoryDialog = value
        },
        handleCategoryDeletion(item, index) {
            this.categoryDeletionData = item
            this.categoryDeletionDialog = true
            this.reserve(index)
        },
        closeCategoryDeletionDialog() {
            this.categoryDeletionDialog = false
        },
        handleCategory(operation, item, index) {
            const categoryData = {
                open: true,
                operation: operation,
                data: item
            }
            this.setCategoryDialogData(categoryData)
            // this.reserve(index)
        }
    },
    computed: {
        ...mapGetters("categories", ["getCategories"]),
    },
    created() {
        this.fetchCategories();
    },
}
</script>

<style lang="scss" scoped>
.scrollable-container {
    height: 85vh;
    overflow-y: auto;
}
</style>


<style lang="scss" scoped>
.description-container {
    height: 100px;
    overflow: auto;
}
</style>