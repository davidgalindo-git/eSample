<script setup>
import {computed, onMounted, watch} from "vue";

const props = defineProps({
  sample: {
    type: Object,
    default: null
  },
  index: {
    type: Number,
    required: true
  },
  alias : {
    type: String,
    required: false
  }
})

const hasSample = computed(() => props.sample !== null)

const playPreview = () => {
  if (hasSample.value && props.sample.previews) {
    const audioUrl = props.sample.previews['preview-lq-mp3']
    const audio = new Audio(audioUrl)

    audio.onended = () => {
      audio.remove()
    };

    audio.play().catch(err => console.error("Play preview error", err))
    console.log("Playing: ", audioUrl)
  } else {
    console.error("No sample assigned to pad #", props.index + 1)
  }
}

const handleKeyDown = (e) => {
  if (e.repeat) return

  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

  if (e.key === String(props.index + 1)) {
    playPreview();
  }
};

watch(() => props.sample, (newSample) => {
  if (newSample) {
    console.log(`Pad #${props.index} got sample :`, newSample.name);
  }
});

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
})

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div class="pad"
       :class="{ 'is-active': hasSample }"
       @mousedown="playPreview"
  >
    <span class="pad-label">{{ index + 1 }}</span>
    <div v-if="hasSample" class="sample-info">
      <p class="sample-alias">{{ alias }}</p>
    </div>
    <div v-else class="empty-slot">+</div>
  </div>
</template>

<style scoped>
.pad {
  width: 100%;
  height: 100%;
  background-color: #2c2c2c;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border: 2px solid #1a1a1a;
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.05), 0 4px 6px rgba(0,0,0,0.3);
  overflow: hidden;
}

.pad.is-active {
  background-color: #444;
  border-color: #2f3c36;
}

.pad:active {
  transform: scale(0.95);
  box-shadow: inset 0 4px 10px rgba(0,0,0,0.5);
}

.pad-label {
  position: absolute;
  top: 5px;
  left: 8px;
  font-size: 0.7rem;
  color: #666;
  font-weight: bold;
}

.sample-alias {
  font-size: 0.6rem;
  text-align: center;
  padding: 5px;
  color: #eee;
  word-break: break-all;
}

.empty-slot {
  color: #444;
  font-size: 1.5rem;
}
</style>