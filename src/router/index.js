import { createRouter, createWebHistory } from 'vue-router';
import Home from "../components/home/Home.vue";
import Menu from "../components/menu/Menu.vue";
import Contact from "../components/contact/Contact.vue";
import CategoriesDashboard from "../components/adminPanel/categories/CategoriesDashboard.vue";
import ItemsDashboard from "../components/adminPanel/items/ItemsDashboard.vue";
import AdminDashboard from "../components/adminPanel/adminDashboard/AdminDashboard.vue";
import Login from "../components/adminPanel/auth/Login.vue";
import axios from 'axios';
import {store} from '../store/store'; // Import Vuex store

const routes = [
  { path: "/home", component: Home },
  { path: "/menu", component: Menu },
  { path: "/admin/categories", component: CategoriesDashboard, meta: { requiresAuth: true } },
  { path: "/contact", component: Contact },
  { path: "/admin/categories/:categoryId/items", component: ItemsDashboard, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/admin/adminDashboard", component: AdminDashboard, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// isLoggedIn function to verify token validity and fetch current user details from backend
async function isLoggedIn() {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    return null; // No token found
  }

  try {
    // Send token to backend to verify and fetch user details
    const response = await axios.post('http://localhost:5001/api/admin/user', {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data; // User details retrieved successfully
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null; // Error fetching user details
  }
}

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = await isLoggedIn();
    console.log(user);
    if (!user) {
      // Update Vuex store
      console.log({store})
      store.commit('adminPanel/auth/setAuthStatus', 'Logout');
      // Remove authToken from localStorage
      localStorage.removeItem("authToken");
      // Redirect to login page
      next({ path: '/login' });
    } else {
      // Token is valid, continue navigation and pass user details
      next();
    }
  } else {
    // No authentication required for this route
    next();
  }
});

export default router;
