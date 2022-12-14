import { ElMessage } from 'element-plus'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  { path: '/introduce', redirect: '/' },
  {
    path: '/',
    component: () => import('../views/Introduce/index.vue'),
  },
  {
    path: '/toForm',
    redirect: '/toForm/login',
    component: () => import('../views/Form/index.vue'),
    children: [
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
  {
    path: '/personedit',
    component: () => import('../views/PersonEdit/index.vue'),
  },
  {
    path: '/library',
    component: () => import('../views/Library/index.vue'),
  },
  {
    path: '/editPage',
    component: () =>
      import('../views/EditPage/index.vue'),
  },
  {
    path: '/preview',
    component: () => import('../views/Preview/index.vue'),
  },
  {
    path: '/nextVersion',
    component: () => import('../views/NextVersion/index.vue')
  }
]


const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})
// 全局拦截,用户跳转到除登录和介绍页外的其他页面时,都要判断是否登录
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token')
  if (to.path === '/toForm/login') { // 跳转到登录页
    if (token) {
      ElMessage({
        type: "error",
        message: '请先退出登录哟'
      })
      next(from.path) // 重定向当前页
      return
    }
    next()
    return
  }
  if (to.path === '/personedit' || to.path === '/editPage' || to.path === 'library') { // 跳转到个人主页或其他页面时判断是否有登陆过
    if (token) { // token存在就通过
      next()
      return
    } else { // 没有就跳到登录
      ElMessage({
        type: 'error',
        message: '请先登录',
        duration: 1000
      })
      next('/toForm/login')
      return
    }
  }
  next()
})
export default router
