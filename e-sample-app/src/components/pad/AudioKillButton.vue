<script setup>
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  isVisible: Boolean,
})
const emit = defineEmits(["stopAll"]);

const handleKeyDown = (e) => {
  if (e.repeat) return
  if (e.key === String(0)) {
    stopAll()
  }
}

const handleClick = () => {
  stopAll()
}

const stopAll = () => {
  console.log("Stopped player (all)")
  emit("stopAll")
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
<div class="btn-container">
  <span class="label">0</span>
  <div
      @mousedown="handleClick"
  >
    STOP ALL
  </div>
</div>
</template>

<style scoped>
.btn-container {
  position: relative;

  background-color: rgba(255, 68, 68, 0.69);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin: 5px;
}
.stop-btn:hover {
  background-color: #cc0000;
}
</style>