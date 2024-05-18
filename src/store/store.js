import { createStore } from 'vuex';
import menuDashboard from './modules/menu/menuDashboard'
import settings from './modules/settings/settings'
import auth from './modules/adminPanel/auth'
import categories from "./modules/adminPanel/categories"
import items from "./modules/adminPanel/items"


export const store = createStore({
    modules: {
        menu: {
            namespaced: true,
            modules: {
                menuDashboard
            }
        },
        settings: {
            namespaced: true,
            modules: {
                settings
            }
        },
        adminPanel: {
            namespaced: true,
            modules: {
                auth,
                categories,
                items
            }
        },
    }
});

