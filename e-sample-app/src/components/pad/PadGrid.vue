<script setup>
import {usePadStore} from "../../stores/padStore.js";

import Pad from "./Pad.vue";

const padStore = usePadStore();

const getPadProps = (visualIndex) => {
  // Function: Returns props for "Pad" component
  const dataIndex = padStore.getPadIndex(visualIndex);
  const padData = padStore.getPadData(dataIndex);

  return {
    sample: padData?.sample || null,
    index: dataIndex,
    alias: padData?.alias || padData?.sample?.name || ""
  }
}

const stopPads = () => {
  playerStore.stop()
}

console.log("Pad container pads:", padStore.assignedPads)
</script>

<template>
  <div class="pad-grid" v-if="padStore.totalPads > 0">
    <div class="pad-wrapper"
         v-for="i in padStore.totalPads"
         :key="i"
    >
      <Pad v-bind="getPadProps(i)"/>
    </div>
  </div>
  <div v-else class="error-msg">
    No pads available. Please load kit or bind samples to pads.
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
  margin-top: 20px;
  margin-bottom: 20px;
}
.pad-wrapper{
  width: 100%;
  height: 100%;
}
.error-msg {
  color: #ff4444;
  padding: 20px;
  text-align: center;
}
</style>