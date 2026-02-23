<script setup>
import {ref} from "vue";

import {useSampleAPI} from "./stores/sampleStore.js";

import SearchBar from "./components/SearchBar.vue";
import SampleContainer from "./components/SampleContainer.vue";
import LikedSamplesList from "./components/LikedSamplesList.vue";
import ShowLikesButton from "./components/ShowLikesButton.vue";

const sampleStore =useSampleAPI()

const isVisible = ref(false)

const toggleLikes = (value) => {
  isVisible.value = value
}
</script>

<template>
  <div id="app">
    <h1>eSample</h1>
    <SearchBar />
    <ShowLikesButton :is-visible="isVisible" @toggle-display="toggleLikes"/>
    <LikedSamplesList v-show="isVisible"/>
    <p>Nb of samples: {{ sampleStore.samples.value.length }}</p>
    <SampleContainer :samples="sampleStore.samples.value"/>
  </div>
</template>

<style scoped>

</style>
