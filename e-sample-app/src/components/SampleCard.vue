<script setup>
import { usePlayer } from "../stores/player.js";
import PlayButton from "./PlayButton.vue";
import LikeButton from "./like/LikeButton.vue";
import DownloadButton from "./download/DownloadButton.vue";
import BindPadButton from "./pad/BindPadButton.vue";
import BindPadPopUp from "./pad/BindPadPopUp.vue";
import {computed, ref} from "vue";

const props = defineProps({
  sample:{
    type: Object,
    required: true
  }
})

const player = usePlayer()

const isPadPopUp = ref(false)

const handlePadPopUp = () => {
  isPadPopUp.value = !isPadPopUp.value
}
</script>

<template>
  <div class="sample-card">
    <div class="sample-top">
      <PlayButton
          :is-playing="player.isPlaying(sample.id)"
          @click="player.togglePlay(sample)"
      />
      <p class="sample-name">{{ sample.name }}</p>
      <div class="actions-container">
        <BindPadPopUp
            v-if="isPadPopUp"
            :sample="sample"
            @close="handlePadPopUp"
        />
        <BindPadButton @toggle-pad-pop-up="handlePadPopUp" />
        <LikeButton :sample-id="sample.id" />
        <DownloadButton :sample-id="sample.id" />
      </div>
    </div>

    <div class="sample-bottom">
      <small>ID: {{ sample.id }}</small>
      <small> by {{ sample.username }}</small>
    </div>

    <div class="tags">
      <span
          v-for="tag in sample.tags"
          :key="tag"
      >
        # {{ tag }}</span>
    </div>
  </div>
</template>

<style scoped>
.sample-card{
  padding: 16px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  background-color: #7e7e7e;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sample-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.sample-name{
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 10px;
}
.actions-container {
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
}

</style>