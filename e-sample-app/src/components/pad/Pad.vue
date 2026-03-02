<script setup>
const props = defineProps({
  sample: {
    type: Object,
    default: null
  },
  index: {
    type: Number,
    required: true
  }
})

</script>

<template>
  <div class="pad">
    <span class="pad-label">{{ index + 1 }}</span>
    <div class="sample-info">
      <p class="sample-name">{{ sample.name }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>