<template>
  <ion-list>
    <ion-item
      button
      :detail="true"
      v-for="result in store.cities"
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
import { useStore } from "@/store/main";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();


async function handleClick(_id: any) {
  router.push(`/home/${_id}`);
}
</script>

<style scoped></style>
