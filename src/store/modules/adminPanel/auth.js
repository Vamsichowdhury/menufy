import {
    loginAdminAPI
} from "../../../api/api.js"

const auth = {
    namespaced: true,
    state: {
        currentAdmin: null,
    },
    getters: {
        getCurrentAdmin: (state) => {
            return state.currentAdmin
        }
    },
    mutations: {
        setCurrentAdmin(state, payload) {
            state.currentAdmin = payload
        },
    },
    actions: {
        setLoginAdmin: async (payload) => {
            const response = await loginAdminAPI(payload)
            return response
        },
    }
};

export default auth
