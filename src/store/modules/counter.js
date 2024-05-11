import axios from "axios"
const counter = {
    namespaced: true,
    state: {
        value: 1,
        posts: [],
    },
    getters: {
        getCounterValue: state => {
            return state.value;
        },
        getPosts: (state) => {
            return state.posts
        }
    },
    mutations: {
        incCounterValue(state, payload) {
            state.value = payload;
        },
        decCounterValue(state, payload) {
            state.value = payload;
        },
        setPosts(state, payload) {
            state.posts = payload
        }
    },
    actions: {
        fetchPosts: async ({ commit }, payload) => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${payload}`)
            commit('setPosts', response.data);
        },
        async deletePostAPI({ commit, state, getters, dispatch }, payload) {
            // getters -> access getters of this module
            // dispatch -> dispatch another action in this module
            console.log(getters)
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${payload}`)
            if (response.status === 200) {
                const newState = state.posts.filter((post) => post.id !== payload)
                commit('setPosts', newState);
            }
        },
        // Your actions
        // async someAction(context, payload) {
        //     // Perform some logic
        //     if (payload.condition) {
        //         // Dispatch another action based on the condition
        //         context.dispatch('anotherAction', payload.data);
        //     } else {
        //         // Dispatch a different action
        // =====>>>>  context.dispatch('differentAction', payload.data);
        //     }
        // },
        // async anotherAction(context, data) {
        //     // Do something with the data
        // },
        // async differentAction(context, data) {
        //     // Do something different with the data
        // }
    }
};

export default counter
