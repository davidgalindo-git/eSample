<script setup>
import {usePadStore} from "../../stores/padStore.js";

import Pad from "./Pad.vue";

const padStore = usePadStore();
console.log("Pad container pads:", padStore.assignedPads)
</script>

<template>
  <div class="pad-grid">
    <div class="pad-wrapper"
         v-for="i in padStore.totalPads"
         :key="i"
    >
      <Pad
          :sample="padStore.getPadData(padStore.getPadIndex(i))?.sample || null"
          :index="padStore.getPadIndex(i)"
          :alias="padStore.getPadData(padStore.getPadIndex(i))?.alias
          || padStore.getPadData(padStore.getPadIndex(i))?.sample?.name || ''"
      />
    </div>
  </div>
</template>

<style scoped>
.pad-grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1/1;
  margin-bottom: 20px;
}
.pad-wrapper{
  width: 100%;
  height: 100%;
}
</style>