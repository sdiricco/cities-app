<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-progress-bar
          type="indeterminate"
          v-if="r.progress"
        ></ion-progress-bar>
      </ion-toolbar>
      <ion-card v-if="!r.progress">
        <ion-card-header>
          <ion-card-title>{{ `${r.city} ${r.provinceCode}` }}</ion-card-title>
          <ion-card-subtitle>
            {{ `${r.postalCode}, ${r.region}` }}
          </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <h2>{{ `Latitude: ${r.latitude}` }}</h2>
          <h2>{{ `Longitude: ${r.longitude}` }}</h2>
        </ion-card-content>
      </ion-card>
    </ion-header>

    <ion-card id="map"></ion-card>

  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonProgressBar,
  IonButtons,
  IonBackButton,
  IonCard,
} from "@ionic/vue";
import { onMounted, defineProps, reactive } from "vue";
import { getCity } from "../api/api";
import * as L from "leaflet";

interface REACTIVE_DATA {
  _id: string;
  city: string;
  postalCode: string;
  region: string;
  countryCode: string;
  provinceCode: string;
  latitude: string;
  longitude: string;
  regionCode: string;

  progress: boolean;
}
/*********************************************************/
/* REACTIVE DATA */
/*********************************************************/
let r = reactive<REACTIVE_DATA>({
  _id: "",
  city: "",
  postalCode: "",
  region: "",
  countryCode: "",
  provinceCode: "",
  latitude: "",
  longitude: "",
  regionCode: "",

  progress: false,
});

const props = defineProps(["_id"]);

onMounted(async () => {
  r.progress = true;

  const response = await getCity(props._id);
  r.city = response.data.data.city;
  r.postalCode = response.data.data.postalCode;
  r.region = response.data.data.region;
  r.countryCode = response.data.data.countryCode;
  r.provinceCode = response.data.data.provinceCode;
  r.latitude = response.data.data.latitude;
  r.longitude = response.data.data.longitude;
  r.regionCode = response.data.data.regionCode;

  r.progress = false;

  var map = L.map("map").setView([Number(r.latitude), Number(r.longitude)], 13);
  console.log(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
});
</script>

<style scoped>
#map {
  height: 100%;
}
</style>