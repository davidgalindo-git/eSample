<script setup>
import {ref} from 'vue'
import { useSampleAPI } from '../../stores/sampleStore.js'

const sampleStore = useSampleAPI()
const keyword = ref('')

const submitKeyword = async () => {
  await sampleStore.searchSamples(keyword.value)
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
    <p v-if="keyword !== ''">keyword: {{ keyword }}</p>
  </div>
</template>

<style scoped>
button {
  margin-left: 10px;
}
.search-container {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>