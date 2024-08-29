import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signUp',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/todo',
      component: () => import('../views/todo/TodoView.vue'),
      redirect: { name: 'all' },
      children: [
        {
          path: 'all',
          name: 'all',
          component: () => import('../views/todo/TodoList.vue')
        },
        {
          path: 'pending',
          name: 'pending',
          component: () => import('../views/todo/TodoList.vue')
        },
        {
          path: 'completed',
          name: 'completed',
          component: () => import('../views/todo/TodoList.vue')
        }
      ]
    },
    { path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') }
  ],
  linkExactActiveClass: 'active', // 設置精確匹配時的active類
  linkActiveClass: 'active' // 設置模糊匹配時的active類
})

export default router
