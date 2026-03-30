<script setup>
import {useSampleAPI} from "../../stores/sampleStore.js";

const sampleStore =useSampleAPI()

const props = defineProps({
  sampleId: { type: [String, Number], required: true }
});
</script>

<template>
  <button
      @click.stop="sampleStore.downloadSample(props.sampleId)"
  >
    <span class="pi pi-download" />
  </button>
</template>

<style scoped>

</style>