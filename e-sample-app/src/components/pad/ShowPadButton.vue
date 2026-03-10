<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-display']);

const toggleDisplay = () => {
  emit("toggle-display", !props.isVisible);
}
</script>

<template>
  <button
      type="button"
      class="btn"
      :class="props.isVisible ? 'btn-danger' : 'btn-primary'"
      @click="toggleDisplay"
  >
    {{ props.isVisible ? "Hide Pad" : "Show Pad" }}
  </button>
</template>

<style scoped>
button {
  margin-right: 10px;
}
</style>