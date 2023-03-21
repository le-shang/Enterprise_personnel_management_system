import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('router', () => {
  const employeeInfo = ref()
  return {employeeInfo}
})
