<script setup>
import {ref} from 'vue'

const keyword = ref(null)
const filters = ref(null)

function submitKeyword(keyword) {
  filters.value = keyword
}
</script>

<template>
  <p>Research samples</p>
  <input v-model="keyword" placeholder="Insert keyword" @keyup.enter="submitKeyword(keyword)"/>
  <p>{{ filters }}</p>
</template>

<style scoped>

</style>