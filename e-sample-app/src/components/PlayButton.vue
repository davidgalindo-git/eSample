<script setup>
import {computed} from "vue";

const props = defineProps({
    isPlaying: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'play',
      validator: (value) => ['play', 'pause', 'stop'].includes(value)
    }
  }
)

const emit = defineEmits(['click'])

const buttonIcon = computed(() => {
  switch(props.variant){
    case 'pause':
      return '⏸'
    case 'stop':
      return '⏹'
    case 'play':
    default:
      return props.isPlaying ? '⏸' : '▶'
  }
})

function handleClick() {
  emit('click')
}
</script>

<template>
  <button
      class="play-button"
      @click="handleClick"
      :aria-label="buttonIcon"
  >
    {{ buttonIcon }}
  </button>
</template>

<style scoped>

</style>