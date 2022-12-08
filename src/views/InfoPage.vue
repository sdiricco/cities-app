<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h2>ciao</h2>
    </ion-content>


  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";

</script>

<style scoped>

</style>
