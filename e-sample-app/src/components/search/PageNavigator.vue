<script setup>
import { useSampleAPI } from '../../stores/sampleStore.js';
const sampleStore = useSampleAPI();
</script>

<template>
  <div class="pagination-controls">
    <button
        :disabled="sampleStore.currentPage === 1"
        @click="sampleStore.searchSamples(sampleStore.currentQuery, sampleStore.currentPage - 1)"
    >
      Previous
    </button>

    <span>Page {{ sampleStore.currentPage }} out of {{ sampleStore.totalPages }}</span>

    <button
        :disabled="sampleStore.currentPage >= sampleStore.totalPages"
        @click="sampleStore.searchSamples(sampleStore.currentQuery, sampleStore.currentPage + 1)"
    >
      Next
    </button>

    <div v-if="sampleStore.totalPages > 1">
      <select
          :value="sampleStore.currentPage"
          @change="e => sampleStore.searchSamples(sampleStore.currentQuery, Number(e.target.value))"
      >
        <option v-for="p in Number(sampleStore.totalPages)" :key="p" :value="p">
          {{ p }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>

</style>