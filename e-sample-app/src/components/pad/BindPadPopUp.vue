<script setup>
import {usePadStore} from "../../stores/padStore.js";

const props = defineProps({
  sample: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close-pop-up'])
const padStore = usePadStore()

const handleAssign = (visualPos) => {
  const logicIndex = padStore.getPadIndex(visualPos)
  padStore.assignSampleToPad(props.sample, logicIndex, props.sample.name)

  emit('close-pop-up')
}

</script>

<template>
  <div class="pad-pop-up">
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

</style>