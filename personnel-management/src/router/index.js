import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      redirect: '/home/adminHome',
      children: [
        {
          path: 'adminHome',
          name: 'adminHome',
          component: () => import('../views/admin/adminHome.vue')
        },
        {
          path: 'employee',
          name: 'employee',
          component: () => import('../views/admin/EmployeeView.vue')
        }
      ]
    }
  ]
})

export default router
