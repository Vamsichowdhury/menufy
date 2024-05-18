import { createRouter, createWebHistory } from 'vue-router'
import Home from "../components/home/Home.vue"
import Menu from "../components/menu/Menu.vue"
import Contact from "../components/contact/Contact.vue"
import CategoriesDashboard from "../components/adminPanel/categories/CategoriesDashboard.vue"
import ItemsDashboard from "../components/adminPanel/items/ItemsDashboard.vue"
import Login from "../components/adminPanel/auth/Login.vue" // Import the Login component

const routes = [
  { path: "/home", component: Home },
  { path: "/menu", component: Menu },
  { path: "/admin/categories", component: CategoriesDashboard, meta: { requiresAuth: true } }, // Add meta field to indicate authentication requirement
  { path: "/contact", component: Contact },
  { path: "/admin/categories/:categoryId/items", component: ItemsDashboard },
  { path: "/login", component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Simulated authentication check
function isLoggedIn() {
  // Replace with real authentication logic
  return !!localStorage.getItem('authToken')
}

// Global navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
