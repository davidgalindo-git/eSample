<script setup>
import {useSampleAPI} from "./stores/sampleStore.js";

import SearchBar from "./components/SearchBar.vue";
import SampleContainer from "./components/SampleContainer.vue";

const sampleStore =useSampleAPI()
</script>

<template>
  <div id="app">
    <h1>eSample</h1>
    <SearchBar />
    <SampleContainer :samples="sampleStore.samples.value"/>
  </div>
</template>

<style scoped>

</style>
