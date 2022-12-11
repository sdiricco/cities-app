<template>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar class="ion-padding-vertical">
          <h3 class="ion-padding">City APK</h3>
          <div class="ion-padding-horizontal">v: {{ store.appVersion }}</div>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-item lines="inset">
          <ion-icon slot="start" :icon="moon"></ion-icon>
          <ion-label>Dark mode</ion-label>
          <ion-toggle
            slot="end"
            @ion-change="onToggleTheme"
            :checked="store.isDark"
          >
          </ion-toggle>
        </ion-item>
      </ion-content>
    </ion-menu>
    <ion-page id="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <div class="ion-padding-vertical">
            <ion-searchbar
              placeholder="Prova con ''Firenze''"
              :debounce="200"
              @ionChange="handleChange($event)"
            ></ion-searchbar>
          </div>
        </ion-toolbar>
        <ion-progress-bar type="indeterminate" v-if="false"></ion-progress-bar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <!-- <ion-button @click="store.clear"></ion-button> -->
        <ion-list v-if="r.results.length && r.city !== ''">
          <ion-item
            button
            :detail="true"
            v-for="(result) in r.results"
            :key="result._id"
            @click="handleClick(result._id)"
          >
            <ion-label>
              <h3>{{ `${result.city} ${result.provinceCode}` }}</h3>
              <p>{{ `${result.postalCode}, ${result.region}` }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
        <div v-else class="ion-padding">
          <div v-if="r.city && r.city !== ''">
            <h3>Nessun risultato</h3>
            <p>Prova con una nuova ricerca</p>
          </div>
          <div v-else>
            <h3>Ricerca una città</h3>
            <p>Prova con 'Firenze' o 'Bologna'</p>
  
          </div>
        </div>
  
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
    IonItem,
    IonLabel,
    IonSearchbar,
    IonList,
    IonProgressBar,
    IonLoading,
    IonMenu,
    IonButtons,
    IonMenuButton,
    IonToggle,
    IonIcon,
  } from "@ionic/vue";
  
  import { moon } from "ionicons/icons";
  import { reactive, computed } from "vue";
  import { getCities } from "../api/api";
  import { useRouter } from "vue-router";
  import { useStore } from "@/store/counter";
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
    city: ''
  });
  
  const router = useRouter();
  
  async function handleClick(_id: any) {
    router.push(`/home/${_id}`);
  }
  
  /*********************************************************/
  /* COMPUTED */
  /*********************************************************/
  
  const retryMessage = computed(() => {
    console.log(store.httpRequestRetryCount);
    return `Sto cercando di connettermi al server ma non risonde. Riprovo..`;
  });
  
  async function handleChange(event: any) {
    console.log(event.target.value);
    const v = String(event.target.value);
    if (v && v !== "") {
      const response = await getCities(v, 1);
      r.results = response.data.data;
    }
    r.city = v;
  }
  
  async function onToggleTheme(evt: any) {
    const isDark = evt.target.checked;
    await store.toggleTheme(isDark);
  }
  </script>
  
  <style scoped>
  ion-icon {
    font-size: 24px;
  }
  
  ion-buttons{
    margin: auto
  }
  
  ion-searchbar {
    --border-radius: 24px;
    padding-bottom: 0px;
    padding-top: 0px;
  }
  </style>
  