<script setup>
import {onMounted, watch} from "vue";

import {useLiked} from "../../stores/likedStore.js";
import {useSampleAPI} from "../../stores/sampleStore.js";

import SampleContainer from "../SampleContainer.vue";

const liked = useLiked();
const sampleStore = useSampleAPI();

onMounted(() => {
  // fetch liked samples when component is mounted
  sampleStore.searchLikedSamples(liked.likedList)
})

watch(() => liked.likedList, (newList) => {
  // update liked samples list if user modifies list
  sampleStore.searchLikedSamples(newList)
}, { deep: true })
</script>

<template>
<div>
  <p>Liked samples: {{ liked.likedList.length }} {{ liked.likedList }}</p>
  <SampleContainer :samples="sampleStore.likedSamples.value"/>
</div>
 </template>

<style scoped>

</style>