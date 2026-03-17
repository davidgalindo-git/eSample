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
    <header class="container-top">
      <h1>eSample</h1>
      <div class="top-actions">
        <FreesoundLoginButton class="login-btn" />
        <SearchBar class="search-bar" />
        <div class="show-buttons">
          <ShowPadButton :is-visible="isPadVisible" @toggle-display="togglePad" />
          <ShowLikesButton :is-visible="isLikesVisible" @toggle-display="toggleLikes"/>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="container-item pad">
        <PadGrid :pads="padStore.assignedPads" v-show="isPadVisible" />
      </div>

      <div class="container-tiem likes">
        <LikedSamplesList v-show="isLikesVisible"/>
      </div>

      <div class="container-item research">
<!--         <p>Nb of samples: {{ sampleStore.samples.value.length }}</p> -->
        <SampleContainer :samples="sampleStore.samples.value"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1{
  top: 0;
  position: static;
  font-size: 3.5rem;
}

.container-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 0;
}

.top-actions {
  display: grid;
  grid-template-columns: auto minmax(300px, 1fr);
  grid-template-areas:
  "login search"
  "login buttons";
  column-gap: 20px;
  row-gap: 10px;
  align-items: center;
}

.login-btn{ grid-area: login }

.search-bar{
  grid-area: search;

}

.show-buttons {
  grid-area: buttons;
  display: flex;
  gap: 10px;
  justify-content: center;
}
.container {
  display: grid;
  gap: 10px;
  padding: 0;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;

  grid-template-columns: 1fr;
  grid-template-areas:
    "pad"
    "likes"
    "research";
}

.pad { grid-area: pad;}
.likes { grid-area: likes;}
.research { grid-area: research;}

@media (min-width: 900px) {
  .container {
    grid-template-columns: 450px 1fr;
    grid-template-areas:
      "pad likes"
      "pad research";
  }
}

@media (min-width: 1300px) {
  .container {
    grid-template-columns: 450px 1fr 1fr;
    grid-template-areas:
        "pad likes research";

    max-width: 1600px;
    margin: 0 auto;
    gap: 10px;
  }
}

.container-item {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
}

:deep(.pad-grid) {
  width: 100%;
  max-width: 100%;
}
</style>
