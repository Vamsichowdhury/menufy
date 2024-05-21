import {
    registerAdminAPI,
    getAllAdminsAPI,
    deleteAdminAPI,
    editAdminAPI
} from "../../../api/adminPanel/adminsDashboard/adminDashboardAPI"

const adminDashboard = {
    namespaced: true,
    state: {
        admins: [],
    },
    getters: {
        
    },
    mutations: {
        
    },
    actions: {
        setRegisterAdmin: async ({ commit }, payload) => {
            const response = await registerAdminAPI(payload)
            return response
        },
        setAllAdmins: async ({ commit }) => {
            const response = await getAllAdminsAPI()
            // commit('setAllAdmins', response?.data)
            return response
        },
        deleteAdmin: async ({ commit }, id) => {
            const response = await deleteAdminAPI(id)
            // commit('setAllAdmins', response?.data)
            return response
        },
        setEditAdmin: async ({ commit }, payload) => {
            const response = await editAdminAPI(payload)
            // commit('setAllAdmins', response?.data)
            return response
        },
        
    }
};

export default adminDashboard
