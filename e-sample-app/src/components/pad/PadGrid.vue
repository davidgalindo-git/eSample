<script setup>
import Pad from "./Pad.vue";

const props = defineProps({
  pads: {
    type: Array,
    required: true,
    default: () => []
  }
})
console.log("Pad container pads:", props.pads)

const totalPads = 9

const getPadIndex = (i) => {
  const row = Math.floor((i - 1) / 3)
  const col = (i - 1) % 3

  return (2 - row) * 3 + col
}

const getPadSample = (index) => {
  return props.pads.find(p => p.index === index) || null
}
</script>

<template>
<div class="pad-grid">
  <div class="pad-wrapper"
       v-for="i in totalPads"
       :key="getPadIndex(i)"
  >
    <Pad sample="" :index="getPadIndex(i)"/>
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