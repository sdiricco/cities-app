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

import { computed } from "vue";

/* IONIC COMPONENTS */
import {
  IonContent,
  IonHeader,
  IonPage,
  IonLoading,
} from "@ionic/vue";

/* APP COMPONENTS */
import ResearchResults from "@/components/HomePage/ResearchResults.vue";
import NoConnection from "@/components/HomePage/NoConnection.vue";
import NoResults from "@/components/HomePage/NoResults.vue";
import ResearchHint from "@/components/HomePage/ResearchHint.vue";
import SearchToolbar from "@/components/HomePage/SearchToolbar.vue";

/* STORE */
import { useStore } from "@/store/main";

/*********************************************************/
/* GLOBALS */
/*********************************************************/
const store = useStore();

/*********************************************************/
/* LOCAL COMPUTED */
/*********************************************************/
const retryMessage = computed(() => `Sto cercando di connettermi al server ma non risonde. Riprovo..`);
const noConnection = computed(() => !store.networkStatus.connected);
const researchHint = computed(() => store.searchCity === "");
const noResults = computed(() => !store.cities.length && store.searchCity !== "");
const areResults = computed(() => store.cities.length > 0);

</script>
