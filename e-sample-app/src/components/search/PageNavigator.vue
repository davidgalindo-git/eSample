<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    validator: (v) => v >= 0
  },
  totalPages: {
    type: Number,
    required: true,
    default: 1,
    validator: (v) => v >= 0
  }
})

const emit = defineEmits(['changePage'])

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('changePage', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('changePage', props.currentPage + 1)
  }
};

const handleInputPage = (event) => {
  let targetPage = parseInt(event.target.value, 10);

  if (isNaN(targetPage)) {
    event.target.value = props.currentPage;
    return;
  }

  if (targetPage >= 1 && targetPage <= props.totalPages) {
    emit('changePage', targetPage)
  } else {
    event.target.value = props.currentPage
  }
}
</script>

<template>
  <div class="pagination-controls"
  >
    <button
        class="icon-btn"
        :disabled="currentPage <= 1"
        @click="previousPage"
        title="Previous Page"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
    </button>

    <span>
      Page
      <input
          :key="currentPage"
          type="number"
          :value="currentPage"
          @change="handleInputPage"
          @keyup.enter="handleInputPage"
          @focus="$event.target.select()"
          style="width: 7ch; text-align: center"
          min="1"
          :max="totalPages"
      >
      / {{ totalPages }}
    </span>

    <button
        class="icon-btn"
        :disabled="currentPage >= totalPages"
        @click="nextPage"
        title="Next Page"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  </div>
</template>

<style scoped>
.pagination-controls{
  margin-bottom: 10px;
}
button {
  margin-right: 10px;
  margin-left: 20px;
}
.icon-btn {
  padding: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.icon-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>