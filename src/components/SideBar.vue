<template>
  <ion-header>
    <ion-toolbar class="ion-padding-vertical">
      <h3 class="ion-padding">City APK</h3>
      <div class="ion-padding-horizontal">v: {{ store.appVersion }}</div>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-item lines="inset">
      <ion-icon slot="start" :icon="moon"></ion-icon>
      <ion-label>Dark mode</ion-label>
      <ion-toggle
        slot="end"
        @ion-change="onToggleTheme"
        :checked="store.isDark"
      >
      </ion-toggle>
    </ion-item>
  </ion-content>
</template>

<script lang="ts" setup>
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonLabel,
  IonToggle,
  IonItem,
} from "@ionic/vue";
import { moon } from "ionicons/icons";
import { useStore } from "@/store/counter";

const store = useStore();

async function onToggleTheme(evt: any) {
  const isDark = evt.target.checked;
  await store.toggleTheme(isDark);
}

</script>
