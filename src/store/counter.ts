import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences';

interface IPreferences {
  id: string
} 

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    httpRequestOnGoing: false,
    httpRequestAborted: false,
    httpRequestRetryCount: 0,
    appVersion: '0.0.2',
    isDark: false,
    preferences:{
      id: ''
    }
  }),
  actions: {
    toggleTheme() {
      document.body.classList.toggle('dark');
    },
    async fetchPreferences(){
      const result = await Preferences.get({key: 'user'})
      this.preferences = JSON.parse(String(result.value))
    },
    async savePreferences(preferences:IPreferences){
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(preferences)
      });
    }
  },
  
})