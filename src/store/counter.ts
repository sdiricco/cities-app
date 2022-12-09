import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import { setTheme } from "../theme/utility";


export const useStore = defineStore({
  id: "store",
  state: () => ({
    httpRequestOnGoing: false,
    httpRequestAborted: false,
    httpRequestRetryCount: 0,
    appVersion: "0.0.7",
    isDark: false
  }),
  actions: {
    async toggleTheme() {
      this.isDark = !this.isDark;
      await setTheme(this.isDark);
      await this.savePreferences(this.isDark);
    },
    async fetchPreferences() {
      const result = await Preferences.get({ key: "isDark" });
      this.isDark = JSON.parse(String(result.value)) || false;
    },
    async savePreferences(isDark: boolean) {
      await Preferences.set({
        key: "isDark",
        value: JSON.stringify(isDark),
      });
    },
    async loadApp() {
      await this.fetchPreferences();
      await setTheme(this.isDark);
    },
  },
});
