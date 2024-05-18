import {
    addItemToCategoryAPI,
    editItemAPI,
    deleteItemAPI,
    getSelectedCategoryAPI,
} from "../../../api/api.js"

const adminCategoryItems = {
    namespaced: true,
    state: {
        itemDialogData: {
            open: false
        },
        selectedCategory: {},   
    },
    getters: {
        getItemDialogData(state) {
            return state.itemDialogData
        },
        getSelectedCategory: (state) => {
            return state.selectedCategory
        },
    },
    mutations: {
        setItemDialogData(state, payload) {
            state.itemDialogData = payload
        },
        setSelectedCategory(state, payload) {
            state.selectedCategory = payload
        },
    },
    actions: {
        fetchSelectedCategory: async ({ commit }, payload) => {
            const response = await getSelectedCategoryAPI(payload)
            commit('setSelectedCategory', response.data);
        },
        addItemToCategory: async ({ dispatch }, payload) => {
            await addItemToCategoryAPI(payload)
            dispatch('fetchSelectedCategory', payload.categoryId);
        },
        editItem: async ({ dispatch }, payload) => {
            const response = await editItemAPI(payload)
            dispatch('fetchSelectedCategory', response?.data?._id);
        },
        deleteItem: async ({ dispatch }, payload) => {
            const response = await deleteItemAPI(payload)
            dispatch('fetchSelectedCategory', response?.data?._id);
        },
    }
};

export default adminCategoryItems
