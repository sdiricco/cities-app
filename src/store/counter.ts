import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import { setTheme } from "../theme/utility";
import { LocalNotifications } from "@capacitor/local-notifications";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    httpRequestOnGoing: false,
    httpRequestAborted: false,
    httpRequestRetryCount: 0,
    appVersion: "0.0.7",
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
    },
    async schedule() {
      const randomId = () => Math.floor(Math.random() * 10000) + 1;

      const notifications = [];
      for (let i = 1; i <10; i++) {
        notifications.push(          {
          title: "Test Title",
          body: `Test body ${i}`,
          id: randomId(),
          schedule: {
            at: new Date(Date.now() + 5000*i), // in a minute
          }
        })
      }

      LocalNotifications.schedule({
        notifications: notifications,
      });
      LocalNotifications.addListener("localNotificationReceived", () => {
        console.log("RECEIVED!!!");
      });
    },
  },
});
