<script setup>
import SampleCard from "./SampleCard.vue";

const props = defineProps({
  samples: {
    type: Array,
    required: true,
    default: () => []
  }
})
console.log("sampleContainer samples:", props.samples)
</script>

<template>
  <div v-if="props.samples.length > 0">
    <p>Nb of samples: {{ samples.length }}</p>
    <div class="sample-container">
      <SampleCard
          v-for="sample in samples"
          :key="sample.id"
          :sample="sample"
      />
    </div>
  </div>
</template>

<style scoped>

</style>