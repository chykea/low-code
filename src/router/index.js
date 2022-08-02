import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/introduce', redirect: '/' },
  {
    path: '/',
    component: () => import('../views/Introduce/index.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/Login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
