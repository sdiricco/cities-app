<template>
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
</template>

<script lang="ts" setup>
import {
  IonToolbar,
  IonSearchbar,
  IonProgressBar,
  IonButtons,
  IonMenuButton,
} from "@ionic/vue";


import { computed } from "vue";
import { useMainStore } from "@/store/main";
const store = useMainStore();

/*********************************************************/
/* COMPUTED */
/*********************************************************/


const noConnection = computed(() => {
  return !store.networkStatus.connected;
});


/*********************************************************/
/* METHODS */
/*********************************************************/

async function handleChange(event: any) {
  if (noConnection.value) {
    return;
  }
  const v = String(event.target.value).trim();
  await store.fetchCities(v);
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
