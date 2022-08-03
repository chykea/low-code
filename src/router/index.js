import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/introduce', redirect: '/' },
  {
    path: '/',
    component: () => import('../views/Introduce/index.vue'),
  },
  {
    path: '/toForm',
    redirect:'/toForm/login',
    component: () => import('../views/Form/index.vue'),
    children:[
      {
        path: 'login',
        component: () => import('../views/Form/component/Login/index.vue'),
      },
      {
        path: 'register',
        component: () => import('../views/Form/component/Register/index.vue'),
      },
    ]
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
