import {
    getSelectedCategoryAPI,
    getAllCategoriesAPI,
    createCategoryAPI,
    editCategoryAPI,
    deleteCategoryAPI
} from "../../../api/api.js"

const adminCategories = {
    namespaced: true,
    state: {
        categories: [],
        selectedCategory: {},
        categoryDialogData: {
            open: false
        },
    },
    getters: {
        getCategories: (state) => {
            return state.categories
        },
        getSelectedCategory: (state) => {
            return state.selectedCategory
        },
        getCategoryDialogData(state) {
            return state.categoryDialogData
        }
    },
    mutations: {
        setCategories(state, payload) {
            state.categories = payload
        },
        setSelectedCategory(state, payload) {
            state.selectedCategory = payload
        },
        setCategoryDialogData(state, payload) {
            state.categoryDialogData = payload
        },
    },
    actions: {
        fetchSelectedCategory: async ({ commit }, payload) => {
            const response = await getSelectedCategoryAPI(payload)
            commit('setSelectedCategory', response.data);
        },
        fetchCategories: async ({ commit }) => {
            const response = await getAllCategoriesAPI()
            commit('setCategories', response.data);
        },
        createCategory: async ({ dispatch }, payload) => {
            await createCategoryAPI(payload)
            dispatch('fetchCategories');
        },
        editCategory: async ({ dispatch }, { id, category }) => {
            await editCategoryAPI({ id, category })
            dispatch('fetchCategories');
        },
        deleteCategory: async ({ dispatch }, payload) => {
            await deleteCategoryAPI(payload)
            dispatch('fetchCategories');
        },
    }
};

export default adminCategories
