<script setup>
import { useLiked } from "../../stores/likedStore.js";

const props = defineProps({
  sampleId: { type: [String, Number], required: true }
});

const liked = useLiked();
</script>

<template>
  <button
      @click.stop="liked.toggleLike(props.sampleId)"
      :class="{ 'is-liked': liked.isLiked(props.sampleId) }"
  >
    {{ liked.isLiked(sampleId) ? '❤️' : '🤍' }}
  </button>
</template>

<style scoped>
button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  transition: transform 0.1s ease;
}
button:hover { transform: scale(1.2); }
.is-liked { color: red; }
</style>