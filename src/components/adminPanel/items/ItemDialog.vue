<template>
    <!-- use this 


    https://vuetifyjs.com/en/components/forms/#rules
https://vuetifyjs.com/en/components/text-fields/#placeholders
https://vuetifyjs.com/en/components/text-fields/#forms

     -->
    <div v-if="getItemDialogData.open" class="text-center">
        <v-dialog v-model="dialog" width="auto">
            <v-card class="mx-auto" style="max-width: 500px; width: 350px;">
                <v-toolbar color="primary" cards dark flat>
                    <v-card-title class="text-h6 font-weight-regular">
                        {{ getItemDialogData?.operation }}
                    </v-card-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-form v-if="getItemDialogData?.operation !== 'Delete Item'" ref="form" v-model="isValid"
                    class="pa-4 pt-6">
                    <v-text-field v-model="itemName" color="primary" label="Enter item name"
                        variant="outlined"></v-text-field>
                    <v-text-field v-model="itemPrice" type="number" color="primary" label="Enter price in ₹"
                        variant="outlined"></v-text-field>
                    <v-textarea v-model="itemDesc" color="primary" label="Enter item description" rows="1"
                        variant="outlined" auto-grow></v-textarea>
                </v-form>
                <v-card-text v-else>
                    <div class="text-medium-emphasis mb-4">
                        Are you sure, you want to delete Item: {{ getItemDialogData?.data?.name }} ?
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="d-flex justify-space-around">
                    <v-btn color="error" text="Add to Cart" variant="outlined" @click="closeDialog()">
                        <v-icon class="mx-2">mdi-delete</v-icon>
                        Cancel
                    </v-btn>
                    <v-btn :disabled="!isValid" @click="handleItem()" variant="outlined" :loading="isLoading"
                        color="primary">
                        {{ getItemDialogData?.operation !== 'Delete Item' ? 'Submit' : 'Delete' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
    name: "ItemDialog",
    props: ['closeCategoryDialog'],
    data() {
        return {
            itemName: "",
            itemPrice: null,
            itemDesc: "",
            isValid: false,
            isLoading: false,
            dialog: true
        }
    },

    computed: {
        ...mapGetters("adminPanel/items", ["getItemDialogData"]),

        isValid() {
            return this.itemName && this.itemDesc
        },
    },

    methods: {
        ...mapMutations("adminPanel/items", ["setItemDialogData"]),
        ...mapActions("adminPanel/items", ["addItemToCategory", "editItem", "deleteItem"]),

        closeDialog() {
            this.setItemDialogData({ open: false })
        },
        handleItem() {
            const item = {
                id: this.getItemDialogData?.data?._id,
                loading: false,
                imageSrc: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                name: this.itemName,
                description: this.itemDesc,
                price: this.itemPrice,
            }
            if (this.getItemDialogData?.operation === "Add Item") {
                this.addItemToCategory({ item, categoryId: this.getItemDialogData?.id })
            } else if (this.getItemDialogData?.operation === "Edit Item") {
                this.editItem({ item: { ...this.getItemDialogData?.data, ...item }, categoryId: this.getItemDialogData?.id })
            } else {
                this.deleteItem({ itemId: this.getItemDialogData?.data?._id, categoryId: this.getItemDialogData?.id })
            }
            this.closeDialog()
        }
    },

    beforeUpdate() {
        this.itemName = this.getItemDialogData?.data?.name || ""
        this.itemPrice = this.getItemDialogData?.data?.price || ""
        this.itemDesc = this.getItemDialogData?.data?.description || ""
    }
}
</script>