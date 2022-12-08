import { defineStore } from 'pinia'


export const useStore = defineStore({
  id: 'store',
  state: () => ({
    httpRequestOnGoing: false,
    httpRequestAborted: false,
    httpRequestRetryCount: 0,
    appVersion: '0.0.2',
    isDark: false,
  }),
  actions: {
    toggleTheme() {
      document.body.classList.toggle('dark');
    }
  },
  
})