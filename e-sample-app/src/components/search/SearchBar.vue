<script setup>
import {ref} from 'vue'
import { useSampleAPI } from '../../stores/sampleStore.js'
import PageNavigator from "./PageNavigator.vue";

const sampleStore = useSampleAPI()
const keyword = ref('')

const isLoading = ref(false)
const error = ref(null)

const submitKeyword = async () => {
  isLoading.value = true
  error.value = null

  try {
    await sampleStore.searchSamples(keyword.value)
  } catch (err) {
    error.value = "Couldn't fetch samples. Verify your connection."
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const handleChangePage = (newPage) => {
  sampleStore.searchSamples(sampleStore.currentQuery.value, newPage)
}
</script>

<template>
  <div class="search-container">
    <input
        v-model="keyword"
        placeholder="Search samples"
        @keyup.enter="submitKeyword"
    />
    <button @click="submitKeyword">Search</button>
    <PageNavigator
      :current-page="sampleStore.currentPage.value"
      :totalPages="sampleStore.totalPages.value"
      @change-page="handleChangePage"
    />
    <p v-if="keyword !== ''">keyword: {{ keyword }}</p>
  </div>
</template>

<style scoped>
button {
  margin-left: 10px;
  margin-bottom: 10px;
}
.search-container {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>