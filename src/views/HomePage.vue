<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <div class="title">
          <ion-label>{{ store.appVersion }}</ion-label>
          <div class="d-flex">
            <ion-toggle
              color="secondary"
              :checked="store.isDark"
              @ionChange="onToggleTheme"
            ></ion-toggle>
            <ion-icon :icon="moon"></ion-icon>
          </div>
        </div>
        <ion-searchbar
          :debounce="200"
          :style="{ padding: '16px' }"
          @ionChange="handleChange($event)"
        ></ion-searchbar>
      </ion-toolbar>
      <ion-progress-bar
        type="indeterminate"
        v-if="false"
      ></ion-progress-bar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- <ion-button @click="store.clear"></ion-button> -->
      <ion-list>
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
  IonButton,
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

async function onToggleTheme(evt:any){
  const isDark = evt.target.checked
  console.log('invoke toggle theme')
  await store.toggleTheme(isDark);
}

onMounted(async () => {
  const response = await getCities("", 1);
  r.results = response.data.data;
});
</script>

<style scoped>

.mt32{
  margin-top: 32px;
}
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

ion-searchbar{
  --border-radius: 24px;
}

.header-md::after{
  background-image: none;
  bottom: inherit;
  border-top: 1px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));

}
</style>
