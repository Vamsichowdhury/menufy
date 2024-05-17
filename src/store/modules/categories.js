import { getSelectedCategory, getAllCategories, createCategory, editCategory, deleteCategory, addItemToCategory, editItem, deleteItem } from "../../api/api.js"
const categories = {
    namespaced: true,
    state: {
        categories: [],
        selectedCategory: {},
        categoryDialogData: {
            open: false
        },
        itemDialogData: {
            open: false
        },
        theme: localStorage.getItem("theme") || "light"
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
        },
        getItemDialogData(state) {
            return state.itemDialogData
        },
        getTheme(state) {
            return state.theme
        },
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
        setItemDialogData(state, payload) {
            state.itemDialogData = payload
        },
        setTheme(state, payload) {
            console.log(payload)
            state.theme = payload
        },

    },
    actions: {
        fetchSelectedCategory: async ({ commit }, payload) => {
            const response = await getSelectedCategory(payload)
            console.log({ response })
            commit('setSelectedCategory', response.data);
        },
        fetchCategories: async ({ commit }) => {
            const response = await getAllCategories()
            commit('setCategories', response.data);
        },
        createCategory: async ({ dispatch }, payload) => {
            await createCategory(payload)
            dispatch('fetchCategories');
        },
        editCategory: async ({ dispatch }, { id, category }) => {
            await editCategory({ id, category })
            dispatch('fetchCategories');
        },
        deleteCategory: async ({ dispatch }, payload) => {
            await deleteCategory(payload)
            dispatch('fetchCategories');
        },
        addItemToCategory: async ({ dispatch }, payload) => {
            await addItemToCategory(payload)
            dispatch('fetchSelectedCategory', payload.categoryId);
        },
        editItem: async ({ dispatch }, payload) => {
            const response = await editItem(payload)
            dispatch('fetchSelectedCategory', response?.data?._id);
        },
        deleteItem: async ({ dispatch }, payload) => {
            const response = await deleteItem(payload)
            dispatch('fetchSelectedCategory', response?.data?._id);
        },
        // fetchPosts: async ({ commit }, payload) => {
        //     const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${payload}`)
        //     commit('setPosts', response.data);
        // },
        // async deletePostAPI({ commit, state, getters, dispatch }, payload) {
        //     // getters -> access getters of this module
        //     // dispatch -> dispatch another action in this module
        //     console.log(getters)
        //     const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${payload}`)
        //     if (response.status === 200) {
        //         const newState = state.posts.filter((post) => post.id !== payload)
        //         commit('setPosts', newState);
        //     }
        // },
    }
};

export default categories
