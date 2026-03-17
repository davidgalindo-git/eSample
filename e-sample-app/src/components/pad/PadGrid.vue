<script setup>
import {usePadStore} from "../../stores/padStore.js";

import Pad from "./Pad.vue";
import AudioKillButton from "./AudioKillButton.vue";
import {usePlayer} from "../../stores/player.js";

const playerStore = usePlayer();
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

const stopAudio = () => {
  playerStore.stopAll()
}

console.log("Pad container pads:", padStore.assignedPads)
</script>

<template>
  <div class="container"  v-if="padStore.totalPads > 0">
    <div class="grid-layout">
      <div class="pad-grid">
        <div class="pad-wrapper"
             v-for="i in padStore.totalPads"
             :key="i"
        >
          <Pad v-bind="getPadProps(i)"/>
        </div>
      </div>
      <AudioKillButton
          @stop="stopAudio"
          class="stop-btn"
      />
    </div>
  </div>
  <div v-else class="error-msg">
    No pads available. Please load kit or bind samples to pads.
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.grid-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0 10px 10px;
  max-width: 500px;
}
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
.stop-btn{
  width: 150px;
}
.error-msg {
  color: #ff4444;
  padding: 20px;
  text-align: center;
}
</style>