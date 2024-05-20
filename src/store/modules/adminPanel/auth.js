import {
    loginAdminAPI
} from "../../../api/api.js"

const auth = {
    namespaced: true,
    state: {
        currentAdmin: null,
        authStatus: 'Logout'
    },
    getters: {
        getCurrentAdmin: (state) => {
            return state.currentAdmin
        },
        getAuthStatus: (state) => {
            return state.authStatus
        }
    },
    mutations: {
        setCurrentAdmin(state, payload) {
            state.currentAdmin = payload
        },
        setAuthStatus: (state, payload) => {
            console.log({payload})
            state.authStatus = payload
        }
    },
    actions: {
        setLoginAdmin: async ({ commit }, payload) => {
            const response = await loginAdminAPI(payload)
            return response
        },
    }
};

export default auth
