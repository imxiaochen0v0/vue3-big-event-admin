import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../views/login/LoginPage.vue')
    },
    {
      path: '/',
      redirect: '/article/manage',
      component: () => import('../views/layout/LayoutContainer.vue'),
      children: [
        {
          path: 'article/manage',
          component: () => import('../views/article/ArticleManage.vue')
        },
        {
          path: 'article/channel',
          component: () => import('../views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('../views/user/UserProfile.vue')
        },
        {
          path: '/user/password',
          component: () => import('../views/user/UserPassword.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('../views/user/UserAvatar.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  // 判断是否登录
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') {
    return '/login'
  }
})

export default router
