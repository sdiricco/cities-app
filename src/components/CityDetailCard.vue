<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ `${props.r.city} ${props.r.provinceCode}` }}</ion-card-title>
      <ion-card-subtitle>
        {{ `${props.r.postalCode}, ${props.r.region}` }}
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <h2>{{ `Latitude: ${props.r.latitude}` }}</h2>
      <h2>{{ `Longitude: ${props.r.longitude}` }}</h2>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import {
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
} from "@ionic/vue";
import { defineProps, withDefaults } from "vue";


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


const props = withDefaults(
  defineProps<{
    r: REACTIVE_DATA;
  }>(),
  {
    r: () => ({
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
    }),
  }
);


</script>

<style scoped>

</style>
