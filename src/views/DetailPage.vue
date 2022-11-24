<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>App</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      Detail page
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
} from "@ionic/vue";
import {onMounted, defineProps } from "vue";
const props = defineProps(['_id'])

onMounted (()=> {
  console.log('mounted')
  console.log(props)
})
</script>

<style scoped>
</style>
