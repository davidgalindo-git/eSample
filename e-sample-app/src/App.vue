<script setup>
import {onMounted, ref} from "vue";

import {useSampleAPI} from "./stores/sampleStore.js";
import {usePadStore} from "./stores/padStore.js";

import SearchBar from "./components/search/SearchBar.vue";
import SampleContainer from "./components/SampleContainer.vue";
import LikedSamplesList from "./components/like/LikedSamplesList.vue";
import ShowLikesButton from "./components/like/ShowLikesButton.vue";
import FreesoundLoginButton from "./components/download/FreesoundLoginButton.vue";
import PadGrid from "./components/pad/PadGrid.vue";

const sampleStore =useSampleAPI()
const padStore = usePadStore()

const isVisible = ref(false)

const toggleLikes = (value) => {
  isVisible.value = value
}

onMounted(() => {
  if (padStore.assignedPads.length === 0) {
    padStore.loadDefaultKit();
  }
});
</script>

<template>
  <div id="app">
    <FreesoundLoginButton />
    <h1>eSample</h1>
    <SearchBar />
    <PadGrid :pads="padStore.assignedPads" />
    <ShowLikesButton :is-visible="isVisible" @toggle-display="toggleLikes"/>
    <LikedSamplesList v-show="isVisible"/>
    <p>Nb of samples: {{ sampleStore.samples.value.length }}</p>
    <SampleContainer :samples="sampleStore.samples.value"/>
  </div>
</template>

<style scoped>

</style>
