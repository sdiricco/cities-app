<template>
  <ion-list>
    <ion-item
      button
      :detail="true"
      v-for="result in props.results"
      :key="result._id"
      @click="handleClick(result._id)"
    >
      <ion-label>
        <h3>{{ `${result.city} ${result.provinceCode}` }}</h3>
        <p>{{ `${result.postalCode}, ${result.region}` }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts" setup>
import { IonItem, IonLabel, IonList } from "@ionic/vue";
import { defineProps, withDefaults } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();

interface CITY {
  _id: string;
  city: string;
  postalCode: string;
  region: string;
  countryCode: string;
  provinceCode: string;
  latitude: string;
  longitude: string;
}

const props = withDefaults(
  defineProps<{
    results: Array<CITY>;
  }>(),
  {
    results: () => [],
  }
);

async function handleClick(_id: any) {
  router.push(`/home/${_id}`);
}
</script>

<style scoped></style>
