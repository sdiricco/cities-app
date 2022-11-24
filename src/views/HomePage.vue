<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>App</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div>
        <ion-searchbar
          :debounce="500"
          @ion-change="handleChange"
        ></ion-searchbar>

        <ion-list >
          <ion-item v-for="(result, index) in r.results" :key="index">
            <ion-label>
              <h3>{{ `${result.city} ${result.provinceCode}` }}</h3>
              <p>{{ `${result.postalCode}, ${result.region}` }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
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
  IonList,
} from "@ionic/vue";
import {reactive } from "vue";
import {getCities} from "../api/api"

/*********************************************************/
/* INTERFACES */
/*********************************************************/
interface CITY {
  city: string,
  postalCode: string,
  region: string,
  countryCode: string,
  provinceCode: string
}
interface REACTIVE_DATA {
  results: Array<CITY>
  query: string
}
/*********************************************************/
/* REACTIVE DATA */
/*********************************************************/
let r = reactive<REACTIVE_DATA>({
  results: [],
  query: ""
});

async function handleChange(evt:any){
  console.log(evt.target.value)
  const response = await getCities(evt.target.value);
  console.log(response)
  r.results = response.data.data
  console.log(r.results)
}

</script>

<style scoped>
</style>
