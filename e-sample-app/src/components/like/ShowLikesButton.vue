<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
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
    {{ props.isVisible ? "Hide Liked Samples" : "Show Liked Samples" }}
  </button>
</template>

<style scoped>

</style>