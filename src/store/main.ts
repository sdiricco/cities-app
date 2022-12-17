import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import { setTheme } from "@/theme/utility";
import * as api from "@/api/api"

import { Network } from '@capacitor/network';

interface ICity {
  _id: string;
  city: string;
  postalCode: string;
  region: string;
  countryCode: string;
  provinceCode: string;
  latitude: string;
  longitude: string;
}
interface IState {
  httpRequestOnGoing: boolean;
  httpRequestAborted: boolean;
  httpRequestRetryCount: number;
  appVersion: string;
  networkStatus: {
    connected: boolean;
    connectionType: string;
  },
  preferences: {
    isDark: boolean;
  },
  cities: Array<ICity>;
  city: ICity;
  searchCity: string;
}
export const useStore = defineStore({
  id: "store",
  state: (): IState =>({
    httpRequestOnGoing: false,
    httpRequestAborted: false,
    httpRequestRetryCount: 0,
    appVersion: "1.0.4",
    networkStatus: {
      connected: true,
      connectionType: ''
    },
    preferences: {
      isDark: false,
    },
    cities: [],
    city: {
      _id: '',
      city: '',
      postalCode: '',
      region: '',
      countryCode: '',
      provinceCode: '',
      latitude: '',
      longitude: ''
    },
    searchCity: ''
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
    async fetchCities(v=''){
      try {
        this.searchCity = v;
        if (this.searchCity === '') {
          this.cities = []
          return;
        }
        const response = await api.getCities(this.searchCity, 1);
        this.cities = response.data.data
      } catch (e) {
        console.log(e)
      }
    },

    listenForNetworkChanges(){
      Network.addListener('networkStatusChange', status => {
        this.networkStatus = status;
        console.log('Network status changed', status.connected);
      });
    },
    async getNetworkStatus(){
      try {
        const status = await Network.getStatus()
        this.networkStatus = status;
        console.log('Network status:', status.connected);
      } catch (e) {
        console.log('Error getting network status')
      }
    },
    async loadApp() {
      await this.fetchPreferences();
      await setTheme(this.isDark);
      this.listenForNetworkChanges();
      await this.getNetworkStatus();
    },
    async clear() {
      await Preferences.clear();
    }
  },
});
