<script setup>
import {ref} from 'vue'

const input = ref(null)
const keyword = ref(null)

function submitKeyword(input) {
  keyword.value = input
}
</script>

<template>
  <p>Research samples</p>
  <input v-model="input" placeholder="Insert keyword" @keyup.enter="submitKeyword(input)"/>
  <p>{{ keyword }}</p>
</template>

<style scoped>

</style>