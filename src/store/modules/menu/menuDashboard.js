import { getAllCategoriesAPI } from "../../../api/api.js"
const categories = {
    namespaced: true,
    state: {
        categories: [],
    },
    getters: {
        getCategories: (state) => {
            return state.categories
        },
    },
    mutations: {
        setCategories(state, payload) {
            state.categories = payload
        },
    },
    actions: {
        fetchCategories: async ({ commit }) => {
            const response = await getAllCategoriesAPI()
            commit('setCategories', response.data);
        },
    }
};

export default categories
