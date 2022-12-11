<template>
  <ion-card>
    <ion-card-header>
      <ion-skeleton-text
        :animated="true"
        style="width: 120px"
      ></ion-skeleton-text>
      <ion-card-subtitle>
        <ion-skeleton-text
          :animated="true"
          style="width: 90px"
        ></ion-skeleton-text>
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-skeleton-text
        :animated="true"
        style="width: 80px"
      ></ion-skeleton-text>
      <ion-skeleton-text
        :animated="true"
        style="width: 80px"
      ></ion-skeleton-text>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import {
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCard,
  IonSkeletonText,
} from "@ionic/vue";
</script>

<style scoped></style>
