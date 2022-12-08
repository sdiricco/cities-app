<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-item >
          <ion-label>{{ store.appVersion }}</ion-label>
          <div class="d-flex">
            <ion-toggle
              :checked="store.isDark"
              @ionChange="store.toggleTheme"
              name="Theme"
            ></ion-toggle>
            <ion-icon :icon="moon"></ion-icon>
          </div>
        </ion-item>

        <ion-searchbar v-model="r.city" animated :style="{padding: '16px'}"></ion-searchbar>
      </ion-toolbar>
      <ion-progress-bar
        type="indeterminate"
        v-if="store.httpRequestOnGoing"
      ></ion-progress-bar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list class="mt32">
        <ion-item
          button
          :detail="true"
          v-for="(result, index) in r.results"
          :key="index"
          @click="handleClick(result._id)"
        >
          <ion-label>
            <h3>{{ `${result.city} ${result.provinceCode}` }}</h3>
            <p>{{ `${result.postalCode}, ${result.region}` }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-loading
        :is-open="store.httpRequestRetryCount > 0"
        :message="retryMessage"
        :key="key"
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
  IonFooter,
  IonTitle,
  IonToggle,
  IonButtons,
  IonIcon,
} from "@ionic/vue";

import { moon } from "ionicons/icons";
import { reactive, onMounted, computed } from "vue";
import { getCities } from "../api/api";
import { useRouter } from "vue-router";
import { watchDebounced } from "@vueuse/core";
import { useStore } from "@/store/counter";
import { v4 as uuidv4 } from "uuid";
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
  page: number;
  city: string;
  results: Array<CITY>;
  query: string;
  progress: boolean;
}
/*********************************************************/
/* REACTIVE DATA */
/*********************************************************/
let r = reactive<REACTIVE_DATA>({
  page: 1,
  city: "",
  results: [],
  query: "",
  progress: false,
});

const router = useRouter();

async function handleClick(_id: any) {
  console.log(_id);
  router.push(`/home/${_id}`);
}

/*********************************************************/
/* COMPUTED */
/*********************************************************/
const city = computed(() => {
  return r.city;
});

const retryMessage = computed(() => {
  console.log(store.httpRequestRetryCount);
  return `Sto cercando di connettermi al server ma non risonde. Riprovo.. ${store.httpRequestRetryCount}/5`;
});

const key = computed(() => {
  return uuidv4() + store.httpRequestRetryCount;
});

watchDebounced(
  city,
  async () => {
    r.page = 1;
    const response = await getCities(r.city, r.page);
    r.results = response.data.data;
  },
  { debounce: 100, maxWait: 5000 }
);

onMounted(async () => {
  r.page = 1;
  const response = await getCities("", r.page);
  r.results = response.data.data;
});
</script>

<style scoped>

.d-flex{
  display: flex;
  align-items: center;
}
ion-icon {
  font-size: 24px;
}
</style>
