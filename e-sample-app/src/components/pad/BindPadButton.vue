<script setup>
const props = defineProps({
  isPadPopUp: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-pad-pop-up'])
</script>

<template>
  <button
      class="bind-pad-button"
      @click.stop="emit('toggle-pad-pop-up')"
      :class="{ 'is-active': isPadPopUp }"
  >
    {{ isPadPopUp ? 'x' : '+'}}
  </button>
</template>

<style scoped>
.bind-pad-button {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #444;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.bind-pad-button.is-active {
  background: #ff4444; /* Rouge pour fermer */
  border-color: #ff8888;
}

.bind-pad-button:hover {
  background: #555;
}
</style>