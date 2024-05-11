import { createStore } from 'vuex';
import categories from "./modules/categories"

export const store = createStore({
    modules: {
        categories
    }
});

