import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useRouterStore = defineStore('router', () => {
  const routers = reactive(
    [
      {
      path:'/',
      name:'login',
      component: ()=>import('../views/LoginView.vue')
    },
  ])
  return {routers}
})
