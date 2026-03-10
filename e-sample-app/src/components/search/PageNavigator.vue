<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number
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
  const targetPage = Number(event.target.value);

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
        :disabled="currentPage <= 1"
        @click="previousPage"
    >
      Previous
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
        :disabled="currentPage >= totalPages"
        @click="nextPage"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.pagination-controls{
  margin-bottom: 10px;
}
button {
  margin-right: 20px;
  margin-left: 20px;
}
</style>