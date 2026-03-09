<script setup>
import { useSampleAPI } from '../../stores/sampleStore.js';
const sampleStore = useSampleAPI();

const previousPage = () => {
  sampleStore.searchSamples(sampleStore.currentQuery.value, sampleStore.currentPage.value - 1);
}

const nextPage = () => {
  sampleStore.searchSamples(sampleStore.currentQuery.value, sampleStore.currentPage.value + 1);
};

const handleInputPage = (event) => {
  const targetPage = Number(event.target.value);

  if (targetPage >= 1 && targetPage <= sampleStore.totalPages.value) {
    sampleStore.searchSamples(sampleStore.currentQuery.value, targetPage);
  }
}
</script>

<template>
  <div class="pagination-controls"
  >
    <button
        :disabled="sampleStore.currentPage.value <= 1"
        @click="previousPage"
    >
      Previous
    </button>

    <span>
      Page
      <input
          :key="sampleStore.currentPage"
          type="number"
          :value="sampleStore.currentPage.value"
          @change="handleInputPage"
          @keyup.enter="handleInputPage"
          @focus="$event.target.select()"
          style="width: 7ch; text-align: center"
          min="1"
          :max="sampleStore.totalPages.value"
      >
      / {{ sampleStore.totalPages }}
    </span>

    <button
        :disabled="sampleStore.currentPage.value >= sampleStore.totalPages.value"
        @click="nextPage"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.pagination-controls{
  margin-bottom: 10px;
}
button {
  margin-right: 20px;
  margin-left: 20px;
}
</style>