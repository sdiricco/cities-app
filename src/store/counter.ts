import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import { setTheme } from "../theme/utility";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    httpRequestOnGoing: false,
    httpRequestAborted: false,
    httpRequestRetryCount: 0,
    appVersion: "0.1.0",
    preferences: {
      isDark: false,
    },
  }),
  getters: {
    isDark: (state: any) => state.preferences.isDark,
  },
  actions: {
    async toggleTheme(isDark: boolean) {
      this.preferences.isDark = isDark;
      console.log("Toggle theme");
      console.log("\tisDark", isDark);
      await setTheme(isDark);
    },
    async fetchPreferences() {
      console.log("Fetch preferences");
      try {
        const data = await Preferences.get({ key: "preferences" });
        const result = JSON.parse(String(data.value));
        if (!result) {
          return;
        }
        this.preferences = result;
        console.log("\tpreferences", this.preferences);
      } catch (e) {
        console.log("\tError fetching preferences");
      }
    },
    async savePreferences(preferences: any) {
      try {
        await Preferences.set({
          key: "preferences",
          value: JSON.stringify(preferences),
        });
      } catch (e) {
        console.log("\tError saving preferences");
      }
    },
    async loadApp() {
      await this.fetchPreferences();
      await setTheme(this.isDark);
    },
    async clear() {
      await Preferences.clear();
    }
  },
});
