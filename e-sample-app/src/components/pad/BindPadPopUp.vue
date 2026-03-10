<script setup>
import {usePadStore} from "../../stores/padStore.js";

const props = defineProps({
  sample: {
    type: Object,
    required: true,
    // Error Guard: ensure the sample actually has data
    validator: (s) => s.id && (s.name || s.username)
  }
})

const emit = defineEmits(['close-pop-up'])
const padStore = usePadStore()

const handleAssign = (visualPos) => {
  const logicIndex = padStore.getPadIndex(visualPos)
  const existingData = padStore.getPadData(logicIndex)

  // Error Guard: Confirmation if pad is already used
  if (existingData && !confirm(`Overwrite ${existingData.alias}: ${existingData.sample.name}?`)) {
    return;
  }

  // Safety: Ensure pad has a fallback name
  const sampleName = props.sample.name || `Sample #${props.sample.id}`;

  padStore.assignSampleToPad(props.sample, logicIndex, sampleName)

  emit('close-pop-up')
}

</script>

<template>
  <div class="pad-pop-up" v-if="padStore.totalPads > 0">
    <div class="mini-grid">
      <button
        v-for="i in padStore.totalPads"
        :key="i"
        class="mini-pad"
        :class="{ 'is-occupied': padStore.getPadData(padStore.getPadIndex(i)) }"
        @click="handleAssign(i)"
      >
       {{ padStore.getPadIndex(i) + 1}}
      </button>
    </div>
  </div>
</template>

<style scoped>
.pad-pop-up {
  position: absolute;
  bottom: 120%;
  right: 0;
  background-color: #1e1e1e;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  width: 140px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mini-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.mini-pad {
  aspect-ratio: 1;
  background: #2a2a2a;
  border: 1px solid #3d3d3d;
  color: #aaa;
  font-size: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.mini-pad:hover {
  background: #3a3a3a;
  color: #00d1b2;
  border-color: #00d1b2;
}

.mini-pad.is-occupied {
  border-color: #555;
  color: #555;
  background: #1a1a1a;
}

.mini-pad.is-occupied:hover {
  border-color: #ff4444;
  color: #ff4444;
}
</style>