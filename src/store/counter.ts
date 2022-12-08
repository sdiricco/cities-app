import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
interface IPreferences {
  id: string;
}

export const useStore = defineStore({
  id: "store",
  state: () => ({
    httpRequestOnGoing: false,
    httpRequestAborted: false,
    httpRequestRetryCount: 0,
    appVersion: "0.0.3",
    isDark: false,
    preferences: {
      id: "",
    },
  }),
  actions: {
    async toggleTheme() {
      this.isDark = !this.isDark;
      document.body.classList.toggle("dark", this.isDark);

    },
    async fetchPreferences() {
      const result = await Preferences.get({ key: "user" });
      this.preferences = JSON.parse(String(result.value));
    },
    async savePreferences(preferences: IPreferences) {
      await Preferences.set({
        key: "user",
        value: JSON.stringify(preferences),
      });
    }
  },
});
