import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useloginStore = defineStore('login', () => {
  const email = ref('')
  const nickname = ref('')

  return { email, nickname }
})
