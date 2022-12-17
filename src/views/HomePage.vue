<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>

    <ion-content :fullscreen="true">
      <NoConnection v-if="noConnection" />
      <ResearchHint v-else-if="researchHint" />
      <ResearchResults v-else-if="areResults" />
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
  IonLoading,
} from "@ionic/vue";

import ResearchResults from "@/components/HomePage/ResearchResults.vue";
import NoConnection from "@/components/HomePage/NoConnection.vue";
import NoResults from "@/components/HomePage/NoResults.vue";
import ResearchHint from "@/components/HomePage/ResearchHint.vue";
import SearchToolbar from "@/components/HomePage/SearchToolbar.vue";

import { computed } from "vue";
import { useStore } from "@/store/main";
const store = useStore();

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
  return store.searchCity === "";
});

const noResults = computed(() => {
  return !store.cities.length && store.searchCity !== "";
});

const areResults = computed(() => {
  return store.cities.length > 0;
});

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
