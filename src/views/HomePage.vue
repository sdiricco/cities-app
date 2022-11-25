<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>City finder</ion-title>
      </ion-toolbar>
      <ion-searchbar :debounce="100" @ion-change="handleChange"></ion-searchbar>
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
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonList
} from "@ionic/vue";
import { reactive, onMounted } from "vue";
import { getCities } from "../api/api";
import { useRouter } from "vue-router";

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
}
/*********************************************************/
/* REACTIVE DATA */
/*********************************************************/
let r = reactive<REACTIVE_DATA>({
  results: [],
  query: "",
});

const router = useRouter();

async function handleChange(evt: any) {
  console.log(evt.target.value);
  const response = await getCities(evt.target.value);
  r.results = response.data.data;
}

async function handleClick(_id: any) {
  console.log(_id);
  router.push(`/home/${_id}`);
}

onMounted(async()=>{
  const response = await getCities("");
  r.results = response.data.data;
})
</script>

<style scoped></style>
