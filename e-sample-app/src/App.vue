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
import ShowPadButton from "./components/pad/ShowPadButton.vue";

const sampleStore =useSampleAPI()
const padStore = usePadStore()

const isPadVisible = ref(false)
const isLikesVisible = ref(false)

const toggleLikes = (value) => {
  isLikesVisible.value = value
}
const togglePad = (value) => {
  isPadVisible.value = value
}

onMounted(() => {
  if (!padStore.assignedPads || !padStore.assignedPads.length === 0) {
    padStore.loadDefaultKit();
  }
});
</script>

<template>
  <div id="app">
    <FreesoundLoginButton />
    <h1>eSample</h1>
    <SearchBar />
    <ShowPadButton :is-visible="isPadVisible" @toggle-display="togglePad" />
    <PadGrid :pads="padStore.assignedPads" v-show="isPadVisible" />
    <ShowLikesButton :is-visible="isLikesVisible" @toggle-display="toggleLikes"/>
    <LikedSamplesList v-show="isLikesVisible"/>
    <p>Nb of samples: {{ sampleStore.samples.value.length }}</p>
    <SampleContainer :samples="sampleStore.samples.value"/>
  </div>
</template>

<style scoped>

</style>
