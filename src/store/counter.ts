import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    httpRequestOnGoing: false,
    httpRequestAborted: false,
    httpRequestRetryCount: 0
  })
})