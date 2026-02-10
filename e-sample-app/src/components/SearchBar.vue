<script setup>
import {ref} from 'vue'
import { useSampleAPI } from '../stores/sampleStore.js'
import SampleCard from "./SampleCard.vue";

const sampleStore = useSampleAPI()
const keyword = ref(null)

const submitKeyword = async (keyword) => {
  await sampleStore.searchSamples(keyword)
}
</script>

<template>
  <p>Research samples</p>
  <input v-model="keyword" placeholder="Insert keyword" @keyup.enter="submitKeyword(keyword)"/>
  <p>keyword: {{ keyword }}</p>
  <div class="sample-container" v-if="sampleStore.samples.value.length > 0">
    <SampleCard
      v-for="sample in sampleStore.samples.value"
      :key="sample.id"
      :sample="sample"
      />
  </div>
  <p>nb of samples: {{ sampleStore.samples.value.length }}</p>
</template>

<style scoped>

</style>