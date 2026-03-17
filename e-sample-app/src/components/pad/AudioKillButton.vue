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

  background-color: rgba(255, 68, 68, 0.82);
  color: white;

  min-width: 100px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin: 5px;
  transition: all 0.1s ease;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.btn-container:hover {
  background-color: rgba(204, 0, 0, 0.75);
}
.label {
  position: absolute;
  top: 5px;
  left: 8px;
  font-size: 0.7rem;
  color: #555;
  font-weight: bold;
}
</style>