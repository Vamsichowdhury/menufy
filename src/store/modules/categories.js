import { getAllCategories, createCategory, editCategory, deleteCategory } from "../../api/api.js"
const categories = {
    namespaced: true,
    state: {
        categories: [],
        categoryDialogData: {
            open: false
        }
    },
    getters: {
        getCategories: (state) => {
            return state.categories
        },
        getCategoryDialogData(state) {
            return state.categoryDialogData
        }
    },
    mutations: {
        setCategories(state, payload) {
            state.categories = payload
        },
        setCategoryDialogData(state, payload) {
            state.categoryDialogData = payload
        }
    },
    actions: {
        fetchCategories: async ({ commit }) => {
            const response = await getAllCategories()
            commit('setCategories', response.data);
        },
        createCategory: async ({ dispatch }, payload) => {
            await createCategory(payload)
            dispatch('fetchCategories');
        },
        editCategory: async ({ dispatch }, {id, category}) => {
            await editCategory({id, category})
            dispatch('fetchCategories');
        },
        deleteCategory: async ({ dispatch }, payload) => {
            await deleteCategory(payload)
            dispatch('fetchCategories');
        }

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
