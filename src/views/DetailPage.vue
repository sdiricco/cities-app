<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
      <skeleton-card v-if="store.httpRequestOnGoing"> </skeleton-card>
      <city-detail-card v-else :r="r"></city-detail-card>
    </ion-header>
    <ion-card id="map"></ion-card>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
} from "@ionic/vue";
import { onMounted, defineProps, reactive, withDefaults } from "vue";
import SkeletonCard from "@/components/SkeletonCard.vue";
import CityDetailCard from "@/components/CityDetailCard.vue";
import { getCity } from "../api/api";
import * as L from "leaflet";
import { useStore } from "@/store/main";
const store = useStore();

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

const props = withDefaults(
  defineProps<{
    _id: string;
  }>(),
  {
    _id: "",
  }
);

onMounted(async () => {
  const response = await getCity(props._id);
  r.city = response.data.data.city;
  r.postalCode = response.data.data.postalCode;
  r.region = response.data.data.region;
  r.countryCode = response.data.data.countryCode;
  r.provinceCode = response.data.data.provinceCode;
  r.latitude = response.data.data.latitude;
  r.longitude = response.data.data.longitude;
  r.regionCode = response.data.data.regionCode;

  var map = L.map("map").setView([Number(r.latitude), Number(r.longitude)], 13);

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

.content-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-card {
  margin: 0px 0px 0px 0px;
  border-radius: 0px;
}

.spinner-position {
  display: flex;
  margin: auto;
  height: 100%;
}
</style>
