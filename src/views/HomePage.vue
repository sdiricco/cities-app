<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>City finder</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div>
        <ion-searchbar
          :debounce="100"
          @ion-change="handleChange"
        ></ion-searchbar>

        <ion-list >
          <ion-item button :detail="true" v-for="(result, index) in r.results" :key="index" @click="handleClick(result._id)">
            <ion-label>
              <h3>{{ `${result.city} ${result.provinceCode}` }}</h3>
              <p>{{ `${result.postalCode}, ${result.region}` }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-card v-if="r.results.length">
          <ion-card-header>
            <ion-card-title>{{ `${r.results[0].city} ${r.results[0].provinceCode}` }}</ion-card-title>
            <ion-card-subtitle>
              {{ `${r.results[0].postalCode}, ${r.results[0].region}` }}
            </ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <h2>{{ `Latitude: ${r.results[0].latitude}` }}</h2>
            <h2>{{ `Longitude: ${r.results[0].longitude}` }}</h2>
          </ion-card-content>
        </ion-card>
      </ion-toolbar>
    </ion-footer>
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
  IonFooter,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from "@ionic/vue";
import {reactive } from "vue";
import {getCities} from "../api/api"
import { useRouter } from 'vue-router'

/*********************************************************/
/* INTERFACES */
/*********************************************************/
interface CITY {
  _id: string,
  city: string,
  postalCode: string,
  region: string,
  countryCode: string,
  provinceCode: string,
  latitude: string,
  longitude: string
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

const router = useRouter()


async function handleChange(evt:any){
  console.log(evt.target.value)
  const response = await getCities(evt.target.value);
  console.log(response)
  r.results = response.data.data
  console.log(r.results)
}

async function handleClick(_id:any){
 console.log(_id)
 router.push(`/detail/${_id}`)
}

</script>

<style scoped>
</style>
