<script setup>
import { usePlayer } from "../stores/player.js";
import PlayButton from "./PlayButton.vue";

const props = defineProps({
  sample:{
    type: Object,
    required: true
  }
})

const player = usePlayer()
</script>

<template>
  <div class="sample-card">
    <PlayButton
      :is-playing="player.isPlaying(sample.id)"
      @click="player.togglePlay(sample)"
    />

    <div class="sample-info">
      <p class="sample-name">{{ sample.name }}</p>
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
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sample-name{
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 10px;
}

</style>