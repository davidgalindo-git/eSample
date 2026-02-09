<script setup>
const props = defineProps({
  sample:{
    type: Object,
    required: true
  }
})

console.log("Sample reçu:", props.sample)
</script>

<template>
  <div class="sample-card">
    <p class="sample-name">{{ sample.name }}</p>
    <small>ID: {{ sample.id }}</small>
    <span>tags: {{ sample.tags }}</span>
  </div>
</template>

<style scoped>
.sample-card{
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sample-name{
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 10px;
}

</style>