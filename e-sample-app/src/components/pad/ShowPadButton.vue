<script setup>
const props = defineProps({
  isVisible: {
    // Flag: Determines if the pad is being displayed or not
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-display']);

const toggleDisplay = () => {
  // Error Guard: prevent props type error
  if (typeof props.isVisible !== 'boolean') {
    console.error("TypeError : isVisible must be a boolean.");
    return
  }
  emit("toggle-display", !props.isVisible);
}
</script>

<template>
  <button
      type="button"
      class="btn"
      :class="isVisible ? 'btn-danger' : 'btn-primary'"
      @click="toggleDisplay"
  >
    {{ isVisible ? "Hide Pad" : "Show Pad" }}
  </button>
</template>

<style scoped>
button {
  margin-right: 10px;
}
</style>