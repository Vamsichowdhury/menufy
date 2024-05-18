
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables

import { createRouter, createWebHistory } from 'vue-router'
import Home from "../components/Home.vue"
import Menu from "../components/Menu.vue"
import Contact from "../components/Contact.vue"
import Admin from "../components/Admin.vue"
import ItemsDashboard from "../components/items/ItemsDashboard.vue"

const routes = [
  { path: "/home", component: Home },
  { path: "/menu", component: Menu },
  { path: "/admin", component: Admin },
  { path: "/contact", component: Contact },
  { path: "/admin/categories/:categoryId/items", component: ItemsDashboard },

]

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router
