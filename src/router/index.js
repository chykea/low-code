import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/Introduce',
    component: () => import('../components/Introduce'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
