<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-searchbar v-model="r.city"></ion-searchbar>
      </ion-toolbar>
      <ion-progress-bar type="indeterminate" v-if="store.httpRequestOnGoing"></ion-progress-bar>
    </ion-header>

    <ion-content :fullscreen="true">
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

      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonProgressBar,
} from "@ionic/vue";
import { reactive, onMounted, computed } from "vue";
import { getCities } from "../api/api";
import { useRouter } from "vue-router";
import { watchDebounced } from "@vueuse/core";
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

async function ionInfinite(ev: any) {
  r.page += 1;
  const response = await getCities(r.city, r.page);
  r.results = [...r.results, ...response.data.data];
  ev.target.complete();
}

/*********************************************************/
/* COMPUTED */
/*********************************************************/
const city = computed(() => {
  return r.city;
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

<style scoped></style>
