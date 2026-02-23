<script setup>
import {useSampleAPI} from "./stores/sampleStore.js";

import SearchBar from "./components/SearchBar.vue";
import SampleContainer from "./components/SampleContainer.vue";
import LikedSamplesList from "./components/LikedSamplesList.vue";

const sampleStore =useSampleAPI()
</script>

<template>
  <div id="app">
    <h1>eSample</h1>
    <SearchBar />
    <LikedSamplesList />
    <p>Nb of samples: {{ sampleStore.samples.value.length }}</p>
    <SampleContainer :samples="sampleStore.samples.value"/>
  </div>
</template>

<style scoped>

</style>
