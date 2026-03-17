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
    <div class="container"
         :class="{
            'has-pad': isPadVisible,
            'has-likes': isLikesVisible,
            'has-research': sampleStore.samples.value.length > 0,
            'only-research': !isPadVisible && !isLikesVisible && sampleStore.samples.value.length > 0,
            'only-pad': isPadVisible && !isLikesVisible && sampleStore.samples.value.length === 0,
            'only-likes': !isPadVisible && isLikesVisible && sampleStore.samples.value.length === 0,
         }"
    >
      <div class="container-item pad" v-show="isPadVisible">
        <PadGrid :pads="padStore.assignedPads" v-show="isPadVisible" />
      </div>

      <div class="container-tiem likes" v-show="isLikesVisible">
        <LikedSamplesList v-show="isLikesVisible"/>
      </div>

      <div class="container-item research" v-show="!isPadVisible || !isLikesVisible ||sampleStore.samples.value.length > 0">
<!--         <p>Nb of samples: {{ sampleStore.samples.value.length }}</p> -->
        <SampleContainer :samples="sampleStore.samples.value"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  gap: 10px;
  padding: 0;
  width: 100%;
  max-width: 100%;
  grid-template-columns: 1fr;
  grid-template-areas: "pad" "likes" "research";
}

.container.only-pad,
.container.only-likes,
.container.only-research {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}

@media (min-width: 900px) {
  /* 1: pad + research + likes */
  .container.has-pad.has-research.has-likes{
    grid-template-columns: 450px 1fr;
    grid-template-areas:
      "pad likes"
      "pad research";
  }
  /* 2: pad + research */
  .container.has-pad:not(.has-likes){
    grid-template-columns: 450px 1.5fr;
    grid-template-areas: "pad research";
    max-width: 1000px;
    margin: 0 auto;
  }
  /* 3: likes + research */
  .container.has-likes.has-research:not(.has-pad){
    grid-template-columns: 1.5fr 1.5fr;
    grid-template-areas: "likes research";
    max-width: 1200px;
    margin: 0 auto;
  }
  /* 4: pad + likes */
  .container.has-pad.has-likes{
    grid-template-columns: 450px 1.5fr;
    grid-template-areas: "pad likes";
    max-width: 1200px;
    margin: 0 auto;
  }
}

@media (min-width: 1300px) {
  /* 1: pad + research + likes */
  .container.has-pad.has-research.has-likes {
    grid-template-columns: 450px 1fr 1fr;
    grid-template-areas: "pad likes research";
    max-width: 1600px;
    margin: 0 auto;
  }
  /* 2: pad + research */
  .container.has-pad.has-research:not(.has-likes){
    grid-template-columns: 450px 1.5fr;
    grid-template-areas: "pad research";
    margin: 0 auto;
  }
  /* 3: likes + research */
  .container.has-likes:not(.has-pad){
    grid-template-columns: 1.5fr 1.5fr;
    grid-template-areas: "likes research";
    max-width: 800px;
    margin: 0 auto;
  }
  /* 4: pad + likes */
  .container.has-pad.has-likes{
    grid-template-columns: 450px 1.5fr;
    grid-template-areas: "pad likes";
    max-width: 800px;
    margin: 0 auto;
  }
}

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
  padding: 0;
  margin-bottom: 10px;
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

.pad { grid-area: pad;  max-width: 450px; }
.likes { grid-area: likes;}
.research { grid-area: research;}

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
