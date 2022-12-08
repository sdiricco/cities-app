<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="title">
          <ion-label>{{ store.appVersion }}</ion-label>
          <div class="d-flex">
            <ion-toggle
              :checked="store.isDark"
              @ionChange="store.toggleTheme"
              name="Theme"
            ></ion-toggle>
            <ion-icon :icon="moon"></ion-icon>
          </div>
        </div>
        <ion-searchbar
          :debounce="500"
          :style="{ padding: '16px' }"
          @ionChange="handleChange($event)"
        ></ion-searchbar>
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
  IonToggle,
  IonIcon,
} from "@ionic/vue";

import { moon } from "ionicons/icons";
import { reactive, onMounted, computed } from "vue";
import { getCities } from "../api/api";
import { useRouter } from "vue-router";
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
  results: Array<CITY>;
  query: string;
  progress: boolean;
  debouncing: boolean;
  timer: any;
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
});

const router = useRouter();

async function handleClick(_id: any) {
  console.log(_id);
  router.push(`/home/${_id}`);
}

/*********************************************************/
/* COMPUTED */
/*********************************************************/

const retryMessage = computed(() => {
  console.log(store.httpRequestRetryCount);
  return `Sto cercando di connettermi al server ma non risonde. Riprovo.. ${store.httpRequestRetryCount}/5`;
});

const key = computed(() => {
  return uuidv4() + store.httpRequestRetryCount;
});

async function handleChange(event:any) {
  console.log(event.target.value);
  const v = String(event.target.value);
  const response = await getCities(v, 1);
  r.results = response.data.data;
}

onMounted(async () => {
  const response = await getCities("", 1);
  r.results = response.data.data;
});
</script>

<style scoped>
.d-flex {
  display: flex;
  align-items: center;
}
ion-icon {
  font-size: 24px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 0px 16px;
}
</style>
