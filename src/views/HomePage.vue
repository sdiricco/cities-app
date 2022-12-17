<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="pt64">
        <ion-buttons slot="start" class="pb16">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <div class="pb16 pr16">
          <ion-searchbar
            placeholder="Prova con ''Firenze''"
            :debounce="200"
            @ionChange="handleChange($event)"
          ></ion-searchbar>
        </div>
        <ion-progress-bar
          type="indeterminate"
          v-if="store.httpRequestOnGoing"
          color="secondary"
        ></ion-progress-bar>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <NoConnection v-if="noConnection" />
      <ResearchHint v-else-if="researchHint" />
      <ResearchResults v-else-if="areResults" :results="r.results" />
      <NoResults v-else-if="noResults" />

      <ion-loading
        :is-open="store.httpRequestRetryCount > 0"
        :message="retryMessage"
      >
      </ion-loading>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSearchbar,
  IonProgressBar,
  IonLoading,
  IonButtons,
  IonMenuButton,
} from "@ionic/vue";

import ResearchResults from "@/components/HomePage/ResearchResults.vue";
import NoConnection from "@/components/HomePage/NoConnection.vue";
import NoResults from "@/components/HomePage/NoResults.vue";
import ResearchHint from "@/components/HomePage/ResearchHint.vue";

import { reactive, computed } from "vue";
import { getCities } from "../api/api";
import { useStore } from "@/store/main";
const store = useStore();

/*********************************************************/
/* INTERFACES */
/*********************************************************/
interface CITY {
  _id: string;
  city: string;
  postalCode: string;
  region: string;
  countryCode: string;
  provinceCode: string;
  latitude: string;
  longitude: string;
}
interface REACTIVE_DATA {
  results: Array<CITY>;
  query: string;
  progress: boolean;
  debouncing: boolean;
  timer: any;
  city: string;
}
/*********************************************************/
/* REACTIVE DATA */
/*********************************************************/
let r = reactive<REACTIVE_DATA>({
  results: [],
  query: "",
  progress: false,
  debouncing: false,
  timer: null,
  city: "",
});

/*********************************************************/
/* COMPUTED */
/*********************************************************/

const retryMessage = computed(() => {
  console.log(store.httpRequestRetryCount);
  return `Sto cercando di connettermi al server ma non risonde. Riprovo..`;
});

const noConnection = computed(() => {
  return !store.networkStatus.connected;
});

const researchHint = computed(() => {
  return r.city === "";
});

const noResults = computed(() => {
  return !r.results.length && r.city !== "";
});

const areResults = computed(() => {
  return r.results.length > 0;
});

/*********************************************************/
/* METHODS */
/*********************************************************/

async function handleChange(event: any) {
  if (noConnection.value) {
    return;
  }
  const v = String(event.target.value).trim();
  const response = await getCities(v, 1);
  r.results = response.data.data;
  r.city = v;
}
</script>

<style scoped>
ion-icon {
  font-size: 24px;
}

ion-buttons {
  margin: auto;
}

ion-searchbar {
  --border-radius: 24px;
  padding-bottom: 0px;
  padding-top: 0px;
}

.pt64 {
  padding-top: 64px;
}

.pb16 {
  padding-bottom: 16px;
}

.pr16 {
  padding-right: 16px;
}
</style>
