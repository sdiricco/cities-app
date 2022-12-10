<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
import { useStore } from "@/store/counter";
const store = useStore();

onMounted(async () => {
  await store.loadApp();
  store.$subscribe(async(mutations, state)=> {
    await store.savePreferences(state.preferences)
  })
});

</script>